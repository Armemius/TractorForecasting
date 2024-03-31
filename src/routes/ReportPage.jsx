import {useParams} from "react-router-dom";
import Markdown from 'react-markdown'
import {useState} from "react";

const ReportPage = () => {
    let { id } = useParams();

    const [markdown, setMarkdown] = useState(`# Report Page
    
    `)

    return (
        <main className="report-page">
            <Markdown>
                {markdown}
            </Markdown>
        </main>
    );
};

export default ReportPage;