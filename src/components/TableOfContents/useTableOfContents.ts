import { useState, useMemo, useCallback } from 'react';
import { ContentItem } from './types/ContentItem';

type TableOfContentsArg = {
    items: ContentItem[];
};

export type TreeNode = ContentItem & { children: TreeNode[] };

const buildTree = (items: ContentItem[]): TreeNode[] => {
    const itemMap: { [id: string]: TreeNode } = {}; // Mapa pro rychlý přístup k položkám podle jejich ID
    const roots: TreeNode[] = []; // Pole kořenových uzlů stromu

    // Inicializace mapy s prázdnými children pro každou položku
    items.forEach(item => {
        itemMap[item.id] = { ...item, children: [] };
    });

    // Sestavení stromové struktury přiřazením children ke správným parent uzlům
    items.forEach(item => {
        if (item.parentId) {
            itemMap[item.parentId]?.children.push(itemMap[item.id]);
        } else {
            roots.push(itemMap[item.id]);
        }
    });

    return roots;
};

export const useTableOfContents = ({ items }: TableOfContentsArg) => {
    const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({}); // Stav pro sledování rozbalených uzlů

    // Funkce pro přepnutí stavu rozbalení/zbavení uzlu
    const toggleExpand = useCallback((id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    }, []);

    // Memoizovaná funkce pro vytvoření stromu při změně seznamu položek
    const tree = useMemo(() => buildTree(items), [items]);

    return { tree, expanded, toggleExpand }; // Vrací stromovou strukturu, stav rozbalení a funkci pro přepínání
};