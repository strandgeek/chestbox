import { ApolloProvider } from '@apollo/client';
import { client } from './client';
import { Topbar } from './components/Topbar';


function App() {
  return (
    <ApolloProvider client={client}>
      <Topbar />
    </ApolloProvider>
  );
}

export default App;
