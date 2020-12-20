import React, { Suspense, lazy } from 'react';
import { Loading, Dropdown } from 'martin-lib';
import 'martin-lib/lib/styles.css';
import './Dashboard.styles.less';
import Lottoland from '../../../services/Api/Lottoland';
import LottoDate from '../../../services/Date/LottoDate';
import DataParsers from '../../../services/Parsers/DataParsers';

const LazyDynamicTable = lazy((): any => import('martin-lib/lib/DynamicTable'));

interface Props {}

interface State {
    loading: boolean;
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
            message: 'Empty. Select an option in Dropdow. First time, take more time (Heroku Idling)',
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
            const { success, data, error, message } = response;
            this.setState({ data: (success && data) || [], loading: false, message: error && message });
        });
    }

    public renderDropdown(): React.ReactElement {
        const { selectedDate, loading } = this.state;

        return (
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
        );
    }

    public renderDynamicTable(): React.ReactElement {
        const { data, loading, message } = this.state;

        return (
            <div className="dashboard-body">
                <Suspense
                    fallback={
                        <div>
                            <Loading width={15} hidden={!loading} />
                        </div>
                    }
                >
                    {data.length ? (
                        <LazyDynamicTable headers={DataParsers.getDataKeys()} items={data} />
                    ) : (
                        <div>{message}</div>
                    )}
                </Suspense>
            </div>
        );
    }

    public render(): React.ReactElement {
        return (
            <div className="dashboard">
                {this.renderDropdown()}
                {this.renderDynamicTable()}
            </div>
        );
    }
}

export default Dashboard;
