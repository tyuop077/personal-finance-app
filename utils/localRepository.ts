import LocalClient from "./localClient";

export default class LocalRepository<T> {
  localClient: LocalClient;
  tableName: string;
  constructor(tableName: string) {
    this.localClient = new LocalClient<T>();
    this.tableName = tableName;
  }
  getItems = () => {
    return this.localClient.get(this.tableName);
  };
  setItems = (data: T) => {
    return this.localClient.set(this.tableName, data);
  };
  removeAll = () => {
    return this.localClient.removeAll(this.tableName);
  };
}
