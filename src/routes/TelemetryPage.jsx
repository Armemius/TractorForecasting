import {useEffect, useMemo, useState} from "react";
import * as Papa from 'papaparse';
import {
    MaterialReactTable, useMaterialReactTable
} from 'material-react-table';
import {api} from "../main.jsx";



const TelemetryPage = () => {
    const columns = useMemo(
        () => [
            {
                accessorKey: '0',
                header: 'Дата и время',
                size: 300,
            },
            {
                accessorKey: '1',
                header: 'Полож. пед. акселератора, %',
                size: 300,
            },
            {
                accessorKey: '2',
                header: 'Нагрузка на двигатель, %',
                size: 300,
            },
            {
                accessorKey: '3',
                header: 'Давление масла в двигателе, kPa',
                size: 300,
            },
            {
                accessorKey: '4',
                header: 'Температура масла в двигателе, °C',
                size: 220,
            },
            {
                accessorKey: '5',
                header: 'Обороты двигателя, об/мин',
                size: 300,
            },
            {
                accessorKey: '6',
                header: 'Счётчик моточасов, hrs:min',
                size: 300,
            },
            {
                accessorKey: '7',
                header: 'Состояние педали сцепления',
                size: 300,
            },
            {
                accessorKey: '8',
                header: 'iButton2',
                size: 300,
            },
            {
                accessorKey: '9',
                header: 'КПП. Температура масла',
                size: 300,
            },
            {
                accessorKey: '10',
                header: 'Статус аномалии телеметрии',
                size: 300,
            },
        ],
        [],
    );

    const column_labels = columns.map(it => it.accessorKey).reduce((it, acc) => it + ',' + acc, '').slice(1) + '\n';
    console.log(column_labels);

    const [data,setMergedData] = useState([]);
    const table = useMaterialReactTable({
        columns,
        data
    });

    const parseAndMergeData = (data) => {
        let mergedData = [];

        data.forEach(item => {
            item.telemetry.forEach(item => {
                const parsedData = Papa.parse(column_labels + item.dataRow, {
                    header: true,
                    skipEmptyLines: true
                });

                if (parsedData?.data) {
                    mergedData = [...mergedData, ...parsedData.data];
                }
            });
        })

        setMergedData(mergedData);

        mergedData = mergedData.map(it => ({...it, [10]: it[10] === 'anomaly' ? '✅' : '❌'}))
        mergedData = mergedData.map(it => Object.fromEntries(Object.entries(it).map(([k, v]) => [k, v ? v : '-'])));

        console.log(mergedData);

        setMergedData(mergedData);
        // setTableData(mergedData)
    };

    useEffect(() => {
        const fetch = async () => {
            const tractorIds = (await api.get('/telemetry/tractor')).data;
            const tractorsData = (await Promise.all(tractorIds.map(tractorId =>
                api.get(`/telemetry/tractor/${tractorId}`)
            ))).map(it => it.data)
            parseAndMergeData(tractorsData);
        }
        fetch().then();
    }, []);

    return (
        <main>
            <MaterialReactTable table={table} />;
        </main>
    );
};

export default TelemetryPage;