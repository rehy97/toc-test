import React, { FC, lazy, Suspense } from 'react';
import { TreeNode, useTableOfContents } from './useTableOfContents';

type TableOfContentsProps = ReturnType<typeof useTableOfContents>;

// Lazy načítání komponenty TreeNodeComponent
const TreeNodeComponent = lazy(() => import('./TreeNodeComponent'));

// Funkce pro vykreslení stromu uzlů
const renderTree = (
    nodes: TreeNode[],
    expanded: { [id: string]: boolean },
    toggleExpand: (id: string) => void
) => (
    <ul>
        {nodes.map(node => (
            // Suspense komponenta pro zobrazení fallback obsahu při lazy načítání
            <Suspense fallback={<li>Loading...</li>} key={node.id}>
                <TreeNodeComponent node={node} expanded={expanded} toggleExpand={toggleExpand} />
            </Suspense>
        ))}
    </ul>
);

// Hlavní komponenta pro zobrazení stromové struktury
export const TableOfContents: FC<TableOfContentsProps> = ({ tree, expanded, toggleExpand }) => (
    <div>
        {renderTree(tree, expanded, toggleExpand)} {/* Vykreslení stromu uzlů */}
    </div>
);

export default TableOfContents;