import { FinanceItem, FinanceType } from "@/modules/finance/finance.model";

export default [
  {
    id: 1,
    title: "Обед на работе",
    type: FinanceType.EXPENSE,
    category: "Еда",
    comment: "тестовый комментарий 1",
    value: 1200,
    date: new Date(Date.now()),
  },
  {
    id: 2,
    title: "Батончик",
    type: FinanceType.EXPENSE,
    category: "Еда",
    comment: "тестовый комментарий 2",
    value: 1200,
    date: new Date(Date.now()),
  },
  {
    id: 3,
    title: "Затарился в Ашане",
    type: FinanceType.EXPENSE,
    category: "Еда",
    comment: "тестовый комментарий 3",
    value: 1200,
    date: new Date(Date.now()),
  },
  {
    id: 4,
    title: "Орехи из лавки",
    type: FinanceType.EXPENSE,
    category: "Еда",
    comment: "тестовый комментарий 4",
    value: 1200,
    date: new Date(Date.now()),
  },
  {
    id: 5,
    title: "Поужинал в ресторане",
    type: FinanceType.EXPENSE,
    category: "Еда",
    comment: "тестовый комментарий 5",
    value: 1200,
    date: new Date(Date.now()),
  },
  {
    id: 6,
    title: "Лукойл",
    type: FinanceType.INCOME,
    category: "Дивиденды",
    comment: "тестовый комментарий 6",
    value: 1000,
    date: new Date(Date.now()),
  },
  {
    id: 7,
    title: "Иванов А.П.",
    type: FinanceType.INCOME,
    category: "Фриланс",
    comment: "тестовый комментарий 7",
    value: 20000,
    date: new Date(Date.now()),
  },
  {
    id: 8,
    title: "ЗП АК БАРС",
    type: FinanceType.INCOME,
    category: "Зарплата",
    comment: "тестовый комментарий 8",
    value: 60000,
    date: new Date(Date.now()),
  },
  {
    id: 9,
    title: "Сургутнефтегаз",
    type: FinanceType.INCOME,
    category: "Дивиденды",
    comment: "тестовый комментарий 9",
    value: 500,
    date: new Date(Date.now()),
  },
  {
    id: 10,
    title: "Соколов В. А.",
    type: FinanceType.INCOME,
    category: "Фриланс",
    comment: "тестовый комментарий 10",
    value: 500,
    date: new Date(Date.now()),
  },
  {
    id: 11,
    title: "Зарплата КФУ",
    type: FinanceType.INCOME,
    category: "Зарплата",
    comment: "тестовый комментарий 11",
    value: 500,
    date: new Date(Date.now()),
  },
  {
    id: 12,
    title: "Зарплата КФУ",
    type: FinanceType.INCOME,
    category: "Зарплата",
    comment: "тестовый комментарий 12",
    value: 500,
    date: new Date(Date.now()),
  },
  {
    id: 13,
    title: "Позитив",
    type: FinanceType.INCOME,
    category: "Дивиденды",
    comment: "тестовый комментарий 13",
    value: 500,
    date: new Date(Date.now()),
  },
] as FinanceItem[];
