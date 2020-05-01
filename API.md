```js
const HELLO_3 = gql`
  query hello($id: Int!) {
    hello3(id: $id)
  }
`;

const QueryPractice = () => {
  const { loading, error, data } = useQuery(HELLO_3, {
    variables: { id: 777 },
  });
  return (
    <>
      <h2>Query Practice</h2>
      {loading && "Loading..."}
      {data && JSON.stringify(data)}
    </>
  );
};
```
