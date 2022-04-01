import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }

// cria uma interface igual a de cima, com base em outra ja existente, porém omitindo alguns campos
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[],
  createTransaction: (transaction : TransactionInput) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode
}


const TransactionsContext = createContext<TransactionsContextData>(
  // força o objeto a ser do tipo TransactionsContextData
  {} as TransactionsContextData
);

export function TransactionsProvider({children} : TransactionsProviderProps) {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function createTransaction(transactionInput : TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data
    setTransactions([...transactions, transaction])
  }

  useEffect(() => {
    api
      .get("/transactions")
      .then(({ data }) => setTransactions(data.transactions));
  }, []);

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}