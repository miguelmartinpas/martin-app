import React from 'react';
import './App.styles.less';

import Lottoland from './services/Api/Lottoland';

interface Props {}

interface State {
    data: any;
}

class App extends React.Component<Props, State> {
    private lottolandService: Lottoland;

    public constructor(props: Props) {
        super(props);
        this.state = {
            data: {},
        };
        this.lottolandService = new Lottoland();
    }

    public componentDidMount() {
        this.lottolandService.get('20200904').then((data: any) => {
            this.setState({ data });
            console.log('data', data);
        });
    }

    public render(): React.ReactElement {
        const value = 'Showcase App!!!';
        const lottoland = new Lottoland();
        return (
            <div className="main">
                <input
                    value={value}
                    onChange={(event) => {
                        console.log('event', event.currentTarget.value);
                    }}
                />
                Hello world
                <div>{JSON.stringify(this.state.data)}</div>
            </div>
        );
    }
}

export default App;

// import React from 'react';
// import './App.styles.less';

// import Lottoland from './services/Api/Lottoland';

// interface Props {}

// interface State {
//     data: any;
// }

// class App extends React.Component<Props, State> {
//     private lottolandService: Lottoland;

//     public constructor(props: Props) {
//         super(props);
//         this.state = {
//             data: {},
//         };
//         this.lottolandService = new Lottoland();
//     }

//     // public componentDidMount() {
//     //     this.lottolandService.get('20200904').then((result: any) => console.log('result', result));
//     // }

//     public render(): React.ReactElement {
//         const value = 'Showcase App!!!';

//         return (
//             <div className="main">
//                 <input
//                     value={value}
//                     onChange={(event) => {
//                         console.log('event', event.currentTarget.value);
//                     }}
//                 />
//                 Hello world
//                 <pre>{this.state.data}</pre>
//             </div>
//         );
//     }
// }

// export default App;
