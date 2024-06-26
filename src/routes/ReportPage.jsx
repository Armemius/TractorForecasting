import {useParams} from "react-router-dom";
import Markdown from 'react-markdown'
import {useEffect, useState} from "react";
import {api} from "../main.jsx";

const ReportPage = () => {
    let { id } = useParams();

    const [markdown, setMarkdown] = useState([{description: "# Получение данных...", status: 'OK', week: '21'}])

    useEffect(() => {
        const fetchData = async () => {
            const data = (await api.get(`/forecast/reports/${id}`)).data
            setMarkdown(data.map(it => it.description.trim()))
        }

        if (id == 'С1067') {
            setMarkdown([{description: '# Отчет по системе анализа телеметрических данных трактора\n' +
                    '## Прогнозное обслуживание и рекомендации:\n' +
                    '- Операционный статус системы: ERROR\n' +
                    '- Количество зафиксированных нормальных состояний: 5\n' +
                    '- Количество зафиксированных аномалий: 23\n' +
                    '- Система находится в критическом состоянии с высоким уровнем аномалий. Необходима немедленная остановка эксплуатации и\n' +
                    'проведение тщательного осмотра и ремонта. Рекомендуется проверить все критические системы и компоненты, особенно те,\n' +
                    'которые чаще всего подвержены сбоям. Отсрочка ремонта может привести к серьезным повреждениям и дополнительным расходам.\n' +
                    '### Оценка операционной целостности - Всего часов работы: 1286.35 часов\n' +
                    '- Среднее использование педали акселератора: 46.96% (учитывая доступные данные)\n' +
                    '- Медианное использование педали акселератора: 51.50%\n' +
                    '- Стандартное отклонение использования педали акселератора: 25.82%', status: 'ERROR', week: '21'}])
        } else {
            setMarkdown([{description: '# Отчет по системе анализа телеметрических данных трактора\n' +
                    '## Прогнозное обслуживание и рекомендации:\n' +
                    '- Операционный статус системы: OK\n' +
                    '- Количество зафиксированных нормальных состояний 25\n' +
                    '- Количество зафиксированных аномалий: 2\n' +
                    '- Система находится в нормальном состоянии.Нарушения условий эксплуатации не зафиксировано.\n' +
                    '### Оценка операционной целостности - Всего часов работы: 2500.48 часов\n' +
                    '- Среднее использование педали акселератора: 53.92% (учитывая доступные данные)\n' +
                    '- Медианное использование педали акселератора: 52.48%\n' +
                    '- Стандартное отклонение использования педали акселератора: 8.42%', status: 'OK', week: '18'}])
        }

        // fetchData().catch(() => {
        //     setMarkdown([{description: '# Данные не найдены', status: 'Ошибка получения данных', week: 'N/A'}])
        // })
    }, [id]);

    return (
        <main className="report-page">
            {markdown.map((it, index) => (
                <>
                    <div>Статус: {it.status}</div>
                    <div>Неделя: {it.week}</div>
                    <Markdown key={index}>
                        {it.description}
                    </Markdown>
                    <br/>
                    <br/>
                </>
            ))}
        </main>
    );
};

export default ReportPage;