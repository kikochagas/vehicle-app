import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {

  return (
    <div className="container">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
