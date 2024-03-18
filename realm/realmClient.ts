import Realm from 'realm';
import Finances from "@/modules/finances/finances";


export const RealmClient = new Realm({schema: [Finances.schema]});