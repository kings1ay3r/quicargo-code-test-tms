import React from 'react'

interface ListItem {
  id: number
  name: string
}

const TrucksList: React.FC = () => {
  const [listItems, setListItems] = React.useState<ListItem[]>([])

  // Fetch the list items from an API or any other data source
  React.useEffect(() => {
    // Your code to fetch the list items goes here
    // For example:
    // const fetchData = async () => {
    //   const response = await fetch('https://api.example.com/trucks');
    //   const data = await response.json();
    //   setListItems(data);
    // };
    // fetchData();
  }, [])

  return (
    <div>
      <h1>Trucks List</h1>
      <ul>
        {listItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default TrucksList
