import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const EmployeeSchema = z.object({
  id: z.number(),
  nome: z.string(),
  cognome: z.string(),
  ruolo: z.string(),
  cellulare: z.number(),
  email: z.string(),
  dataAssunzione: z.string(),
  dataScadenzaContratto: z.string(),
});

export const EmployeeListSchema = z.array(EmployeeSchema);

export const CustomerSchema = z.object({
  id: z.number(),
  nome: z.string(),
  cognome: z.string(),
  cellulare: z.number(),
  email: z.string(),
  dataNascita: z.string(),
});

export const CustomerListSchema = z.array(CustomerSchema);

export const ServiceSchema = z.object({
  id: z.number(),
  serviceName: z.string(),
  servicePrice: z.number(),
});

export const ServiceListSchema = z.array(ServiceSchema);

export const ProductSchema = z.object({
  id: z.string(),
  prezzo: z.number(),
  nomeProdotto: z.string(),
  quantita: z.number(),
});

export const ProductListSchema = z.array(ProductSchema);

export const SoldArticleSchema = z.object({
  id: z.number(),
  articleName: z.string(),
  articlePrice: z.number(),
  articleQuantity: z.number(),
});

export const SoldArticleListSchema = z.array(SoldArticleSchema);

export const SaleReceiptSchema = z.object({
  id: z.number(),
  article: z.string(),
  articleQuantity: z.number(),
  articlePrice: z.number(),
  type: z.string(),
});

export const SaleReceiptListSchema = z.array(SaleReceiptSchema);

export const SaleSchema = z.object({
  date: z.string(),
  operator: z.number(),
  customer: z.number(),
  flValidity: z.string(),
  soldProducts: SoldArticleListSchema,
  soldServices: SoldArticleListSchema,
  total: z.number(),
  notes: z.string(),
});

export const SaleListSchema = z.array(SaleSchema);

export const MessageSchema = z.object({
  id: z.number(),
  messageName: z.string(),
  messageText: z.string(),
});

export const MessageListSchema = z.array(MessageSchema);

export type LoginModel = z.infer<typeof LoginSchema>;
export type EmployeeModel = z.infer<typeof EmployeeSchema>;
export type EmployeeListModel = z.infer<typeof EmployeeListSchema>;
export type CustomerModel = z.infer<typeof CustomerSchema>;
export type CustomerListModel = z.infer<typeof CustomerListSchema>;
export type ServiceModel = z.infer<typeof ServiceSchema>;
export type ServiceListModel = z.infer<typeof ServiceListSchema>;
export type ProductModel = z.infer<typeof ProductSchema>;
export type ProductListModel = z.infer<typeof ProductListSchema>;
export type SoldArticleModel = z.infer<typeof SoldArticleSchema>;
export type SoldArticleListModel = z.infer<typeof SoldArticleListSchema>;
export type SaleReceiptModel = z.infer<typeof SaleReceiptSchema>;
export type SaleReceiptListModel = z.infer<typeof SaleReceiptListSchema>;
export type SaleModel = z.infer<typeof SaleSchema>;
export type SaleListModel = z.infer<typeof SaleListSchema>;
export type MessageModel = z.infer<typeof MessageSchema>;
export type MessageListModel = z.infer<typeof MessageListSchema>;
