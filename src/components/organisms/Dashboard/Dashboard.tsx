import React from 'react';
import { Loading, Dropdown, DynamicTable } from 'martin-lib';
import 'martin-lib/dist/styles.css';
import './Dashboard.styles.less';
import Lottoland from '../../../services/Api/Lottoland';
import LottoDate from '../../../services/Date/LottoDate';
import DataParsers from '../../../services/Parsers/DataParsers';

interface Props {}

interface State {
    loading: boolean;
    error: boolean;
    message: string;
    data: any[];
    selectedDate: string;
}

class Dashboard extends React.Component<Props, State> {
    private lottolandService: Lottoland;

    private lottodateService: LottoDate;

    private datesForDropdown: any[];

    public constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            message: '',
            data: [],
            selectedDate: '',
        };
        this.lottolandService = new Lottoland();
        this.lottodateService = new LottoDate();
        this.datesForDropdown = this.lottodateService.getFromTodayParsed();
    }

    public onChangeHandle(value: string): void {
        this.setState({ selectedDate: value, loading: true });
        this.lottolandService.get(value).then((response: any) => {
            const { success, data } = response;
            if (success) {
                this.setState({ data, loading: false }, () => console.log('state och', this.state));
            }
        });
    }

    public render(): React.ReactElement {
        const { data, selectedDate, loading } = this.state;

        return (
            <div className="dashboard">
                <div className="dashboard-header">
                    <div className="dashboard-loading">
                        <Loading width={15} hidden={!loading} />
                    </div>
                    <Dropdown
                        options={this.datesForDropdown}
                        selected={selectedDate}
                        onChange={(value: string) => this.onChangeHandle(value)}
                        disabled={loading}
                    />
                </div>
                <div className="dashboard-body">
                    <DynamicTable headers={DataParsers.getDataKeys()} items={data} />
                </div>
            </div>
        );
    }
}

export default Dashboard;
