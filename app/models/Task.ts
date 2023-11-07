// This TS version of the Task model shows how to create Realm objects using
// TypeScript syntax, using `@realm/babel-plugin`
// (https://github.com/realm/realm-js/blob/main/packages/babel-plugin/).
//
// If you are not using TypeScript and `@realm/babel-plugin`, you instead need
// to defining a schema on the class - see `Task.js` in the Realm example app
// for an example of this.

import Realm, {BSON} from 'realm';

// To use a class as a Realm object type in Typescript with the `@realm/babel-plugin` plugin,
// simply define the properties on the class with the correct type and the plugin will convert
// it to a Realm schema automatically.
export class Task extends Realm.Object {
  _id
  description
  isComplete
  createdAt
  userId
  items // new field

  static schema = {
    name: "Task",
    primaryKey: "_id",
    properties: {
      _id: 'objectId',
      description: "string",
      createdAt: {
        type: "date",
        default: new Date(),
      },
      isComplete: {
        type: "bool",
        default: false,
        indexed: true,
      },
      userId: "string",

      // New field
      items: {
        type: 'list',
        objectType: 'ItemSchema',
        default: []
      }
    },
  };
}

export class ItemSchema extends Realm.Object {
  static schema: Realm.ObjectSchema = {
    name: 'ItemSchema',
    embedded: true,
    properties: {
      name: 'string'
    },
  };
}