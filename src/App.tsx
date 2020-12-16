import React from 'react';
import './App.styles.less';

import Lottoland from './services/Api/Lottoland';

class App extends React.PureComponent {
    public render(): React.ReactElement {
        const value = 'Showcase App!!!';
        const lottoland = new Lottoland();
        lottoland.get('202009044').then((result) => console.log('result', result));
        return (
            <div className="main">
                <input
                    value={value}
                    onChange={(event) => {
                        lottoland.get('20200904​').then((result) => console.log('result', result));
                        console.log('event', event.currentTarget.value);
                    }}
                />
                Hello world
            </div>
        );
    }
}

export default App;
