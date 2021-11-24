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
    "$oid": "619e4933f28599d4ef895056"
  },
  "authorName": "Nguyen Van A",
  "postId": {
    "$oid": "619d001cff7c23ca498ce3ce"
  },
  "postDate": {
    "$date": "2015-01-11T17:00:00Z"
  },
  "content": "my dream house"
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
  "price": 3500000000,
  "seller": {
    "name": "Le Van A",
    "phoneNumber": "0123456789",
    "email": "lva123@gmail.com"
  },
  "rate": 4,
  "status": "For Sale",
  "category": {
    "name": "Home",
    "categoryId": {
      "$oid": "619d0e424317eda2eb700a18"
    }
  },
  "detailImage": [
    "../images/living-room.jpg",
    "../images/bedroom.jpg",
    "../images/outdoor.jpg"
  ],
  "previewImage": "../../images/house1.jpg"
}]);
db.schedules.insertMany([{
  "_id": {
    "$oid": "619e4e5ff28599d4ef895065"
  },
  "seller": {
    "name": "Le Van A",
    "phoneNumber": "0123456789",
    "email": "lva123@gmail.com"
  },
  "propertyId": {
    "$oid": "619d001cff7c23ca498ce3ce"
  },
  "visitForm": "In Person",
  "ack": "pending",
  "appointmentDate": {
    "$date": "2017-04-01T17:00:00Z"
  }
}]);