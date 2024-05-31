import './App.css';
import { useTableOfContents } from "./components/TableOfContents/useTableOfContents.ts";
import { TableOfContents } from "./components/TableOfContents/TableOfContents.tsx";
import { NOZ_TOC_ITEMS_MOCK } from './components/TableOfContents/data/NOZ_TOC_ITEMS_MOCK.ts';
import { tableOfContentsItems } from './components/TableOfContents/data/tableOfContentsItems.ts';

function App() {
    const props = useTableOfContents({ items: NOZ_TOC_ITEMS_MOCK});

    return (
        <div>
            <TableOfContents {...props} />
        </div>
    );
}

export default App;
