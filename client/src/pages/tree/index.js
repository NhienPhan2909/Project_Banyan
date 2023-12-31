import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PMTree from "./PMTree";
import EditDialog from "./EditDialog";
import CreateDialog from "./CreateDialog";
import DeleteDialog from "./DeleteDialog";
import ExpandDialog from "./ExpandDialog";
import axios from "axios";
import "./tree.css";

const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const _getNode = async (nodeId, index) => {
    const nodeResponse = await axios.get(
        `http://localhost:11000/nodes/${nodeId}`
    );

    const children = await Promise.all(
        nodeResponse.data._childIdList.map(_getNode)
    );

    var scope = nodeResponse.data.agile_scope;
    var content = capitalize(nodeResponse.data.content);
    var nodeName = nodeResponse.data.name || (index === -1 ? "Project" : capitalize(scope) + " " + (index + 1));

    return {
        id: nodeId,
        name: nodeName,
        attributes: {
            type: scope,
            prompt: content,
        },
        children: children,
    };
};

const getProject = async (projectId) => {
    const token = localStorage.getItem("jwtToken");

    // get project from projects collection in database
    const projectResponse = await axios.get(
        `http://localhost:11000/projects/${projectId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const tree = await _getNode(projectResponse.data._rootId, -1);

    return tree;
};

export default function TreeContainer() {
    const project = useParams()._projectId;

    const [selected, setSelected] = useState("");
    const [data, setData] = useState();

    const [openDialog, setOpenDialog] = useState(false);
    const [openCreateDialog, setOpenCreateDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openExpandDialog, setOpenExpandDialog] = useState(false);

    useEffect(() => {
        async function getData() {
            const data = await getProject(project);
            setData(data);
        }
        getData();
    }, []);

    return (
        <div id="tree-body">
            <EditDialog
                open={openDialog}
                setOpen={setOpenDialog}
                data={data}
                setData={setData}
                selected={selected}
            />
            <CreateDialog
                open={openCreateDialog}
                setOpen={setOpenCreateDialog}
                data={data}
                setData={setData}
                selected={selected}
            />
            <DeleteDialog
                open={openDeleteDialog}
                setOpen={setOpenDeleteDialog}
                data={data}
                setData={setData}
                selected={selected}
            />
            <ExpandDialog
                open={openExpandDialog}
                setOpen={setOpenExpandDialog}
                data={data}
                setData={setData}
                selected={selected}
            />
            {data && (
                <PMTree
                    data={data}
                    setData={setData}
                    selected={selected}
                    setSelected={setSelected}
                    setOpenDialog={setOpenDialog}
                    setOpenCreateDialog={setOpenCreateDialog}
                    setOpenDeleteDialog={setOpenDeleteDialog}
                    setOpenExpandDialog={setOpenExpandDialog}
                />
            )}
        </div>
    );
}
