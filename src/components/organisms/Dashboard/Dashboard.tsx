import React from 'react';
import { Dropdown, DynamicTable } from 'martin-lib';
import 'martin-lib/dist/styles.css';
import './Dashboard.styles.less';
import Lottoland from '../../../services/Api/Lottoland';
import LottoDate from '../../../services/Date/LottoDate';

interface Props {}

interface State {
    data: any;
    selectedDate: string;
}

class Dashboard extends React.Component<Props, State> {
    private lottolandService: Lottoland;

    private lottodateService: LottoDate;

    private dates: any;

    public constructor(props: Props) {
        super(props);
        this.state = {
            data: {},
            selectedDate: '',
        };
        this.lottolandService = new Lottoland();
        this.lottodateService = new LottoDate();
        this.dates = this.lottodateService
            .getFromToday()
            .map((date) => ({ label: this.lottodateService.simpleParserDate(date), value: date }));
    }

    public componentDidMount(): void {
        this.lottolandService.get('20200904').then((data: any) => {
            this.setState({ data }, () => console.log('state', this.state));
        });
    }

    public onChangeHandle(value: string) {
        this.setState({ selectedDate: value });
        this.lottolandService.get(value).then((data: any) => {
            this.setState({ data }, () => console.log('state', this.state));
        });
    }

    public render(): React.ReactElement {
        const { data, selectedDate } = this.state;

        const disabled = false;

        const headers = ['a a a a a a', 'b b b b b b b b', 'c c c c c c c c ', 'd d d d d d d d '];
        const items = [{ a: '1 1 1 1 1 1 1 ', b: '2 2 2 2  2 2 2 ', c: '3 3 3 3  3', d: '4 4 4 4 4 4' }];

        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <Dropdown
                        options={this.dates}
                        selected={selectedDate}
                        onChange={(value: string) => this.onChangeHandle(value)}
                        disabled={disabled}
                    />
                </div>
                <div className="dashboard-body">
                    <DynamicTable headers={headers} items={items} />
                </div>
            </div>
        );
    }
}

export default Dashboard;
