import React from 'react';
import { Dropdown, DynamicTable } from 'martin-lib';
import 'martin-lib/dist/styles.css';
import './Dashboard.styles.less';
import Lottoland from '../../../services/Api/Lottoland';

interface Props {}

interface State {
    data: any;
}

class Dashboard extends React.Component<Props, State> {
    private lottolandService: Lottoland;

    public constructor(props: Props) {
        super(props);
        this.state = {
            data: {},
        };
        this.lottolandService = new Lottoland();
    }

    public componentDidMount(): void {
        this.lottolandService.get('20200904').then((data: any) => {
            this.setState({ data });
            console.log('data:', data);
        });
    }

    public render(): React.ReactElement {
        const { data } = this.state;

        const options = [
            { label: 'Labe one', value: 'one' },
            { label: 'Labe two', value: 'two' },
            { label: 'Labe three', value: 'three' },
        ];
        const selected = 'three';
        const onChange = (text: string) => console.log('>>', text);
        const disabled = false;

        const headers = ['a a a a a a', 'b b b b b b b b', 'c c c c c c c c ', 'd d d d d d d d '];
        const items = [{ a: '1 1 1 1 1 1 1 ', b: '2 2 2 2  2 2 2 ', c: '3 3 3 3  3', d: '4 4 4 4 4 4' }];

        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <Dropdown options={options} selected={selected} onChange={onChange} disabled={disabled} />
                </div>
                <div className="dashboard-body">
                    <DynamicTable headers={headers} items={items} />
                </div>
            </div>
        );
    }
}

export default Dashboard;
