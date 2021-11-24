db = connect( 'mongodb://localhost:27017/sweethomedb' );
db.category.insertMany([{
  "_id": {
    "$oid": "619d0b8dff7c23ca498ce404"
  },
  "name": "Home",
  "properties": [
    {
      "$oid": "619d001cff7c23ca498ce3ce"
    }
  ]
}]);
db.comments.insertMany([{
  "_id": {
    "$oid": "619d0422ff7c23ca498ce3e4"
  },
  "authorName": "Nguyen Van A",
  "postId": "619d001cff7c23ca498ce3ce",
  "content": "What a beautiful house!",
  "postDate": {
    "$date": "2015-07-03T00:00:00Z"
  }
}]);
db.customers.insertMany([{
  "_id": {
    "$oid": "619d012dff7c23ca498ce3df"
  },
  "username": "nva123",
  "password": "123456",
  "fullName": "Nguyen Van A",
  "address": "227 Nguyen Van Cu",
  "favorite": [
    {
      "$oid": "619d001cff7c23ca498ce3ce"
    }
  ],
  "email": "\"nva123@gmail.com",
  "schedule": [
    {
      "$oid": "619d088aff7c23ca498ce3f3"
    }
  ]
}]);
db.properties.insertMany([{
  "_id": {
    "$oid": "619d001cff7c23ca498ce3ce"
  },
  "name": "Golden Dragon",
  "address": "227 Nguyen Van Cu",
  "description": "This is a house",
  "feature": [
    "3 bedrooms",
    "3 bathrooms",
    "Built in 2011",
    "Forced air gar"
  ],
  "price": "3500000000",
  "seller": {
    "name": "Le Van A",
    "phoneNumber": "0123456789",
    "email": "lva123@gmail.com"
  },
  "rate": "4",
  "status": "For Sale",
  "category": {
    "name": "Home",
    "categoryId": {
      "$oid": "619d0e424317eda2eb700a18"
    }
  }
}]);
db.schedules.insertMany([{
  "_id": {
    "$oid": "619d088aff7c23ca498ce3f3"
  },
  "seller": {
    "name": "Le Van A",
    "phoneNumber": "0123456789",
    "email": "lva123@gmail.com"
  },
  "propertyId": "619d001cff7c23ca498ce3ce",
  "appoinmentDate": {
    "$date": "2017-04-01T17:00:00Z"
  },
  "visitForm": "In Person",
  "ack": "pending"
}]);