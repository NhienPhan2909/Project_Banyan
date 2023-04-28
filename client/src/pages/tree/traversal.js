// This file hold functions that are useful for traversing our tree

// Find the node in the PMTree given an id
export function traverse (node, id) {
    if (node.id === id) {
        return node;
    }
    // Not the node we seek, recurse on the children (if they exist)
    if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
            const result = traverse(node.children[i], id);
            if (result) {
                return result;
            }
        }   
    }
    return null;
};

 // Remove the node in the PMTree given an id
 export function traverseAndRemove (node, id) {
    if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
            if (node.children[i].id === id) {
                // remove the node from children
                node.children.splice(i, 1); 
                // indicate that the node has been removed
                return true; 
            }
            const result = traverseAndRemove(node.children[i], id);
            if (result) {
                // indicate that the node has been removed
                return true;
            }
        }
    }
    return false; // indicate that the node has not been found
};
