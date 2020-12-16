import React from 'react';
import './App.styles.less';

class App extends React.PureComponent {
    public render(): React.ReactElement {
        const value = 'Showcase App!!!';
        return (
            <div className="main">
                <input value={value} onChange={(event) => console.log('event', event.currentTarget.value)} />
                Hello world
            </div>
        );
    }
}

export default App;
