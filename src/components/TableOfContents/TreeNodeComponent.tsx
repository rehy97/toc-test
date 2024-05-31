import React, { FC, memo } from 'react';
import { TreeNode } from './useTableOfContents';

// Definice typu pro vlastnosti komponenty TreeNodeComponent
type TreeNodeProps = {
    node: TreeNode;
    expanded: { [id: string]: boolean };
    toggleExpand: (id: string) => void;
}

// Komponenta pro zobrazení uzlu stromu
const TreeNodeComponent: FC<TreeNodeProps> = memo(({ node, expanded, toggleExpand }) => {
    const hasChildren = node.children.length > 0; // Zjistí, zda má uzel nějaké podřízené uzly
    const isExpanded = expanded[node.id]; // Zjistí, zda je uzel rozbalený

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {/* Tlačítko pro rozbalení/sbalení uzlu, pouze pokud má podřízené uzly */}
                <button onClick={() => hasChildren && toggleExpand(node.id)}>
                    {node.name}
                </button>
            </div>
            {/* Zobrazení podřízených uzlů, pokud je uzel rozbalený */}
            {isExpanded && hasChildren && (
                <div style={{ paddingLeft: 20 }}>
                    {node.children.map(child => (
                        // Rekurzivní vykreslení podřízených uzlů
                        <TreeNodeComponent key={child.id} node={child} expanded={expanded} toggleExpand={toggleExpand} />
                    ))}
                </div>
            )}
        </div>
    );
});

export default TreeNodeComponent;