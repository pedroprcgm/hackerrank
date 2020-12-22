"""
Node is defined as
self.left (the left child of the node)
self.right (the right child of the node)
self.info (the value of the node)
"""
def levelOrder(root):
    list = []
    list.append(root)
    accessNodeList(list)

def accessNodeList(nodes):
    newNodes = []
    
    for node in nodes:
        print(node.info, end =" ")
        
        if (node.left is not None):
            newNodes.append(node.left)
            
        if (node.right is not None):
            newNodes.append(node.right)
    
    if newNodes:
        accessNodeList(newNodes)
