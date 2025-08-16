import type Client from "@/types/Client";
import api from "./api";

class ClientsService {
  async all(): Promise<Client[]> {
    const response = await api.get("/clients");
    return response.data;
  }

  async find(id: string): Promise<Client> {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  }

  async create(data: Omit<Client, "id" | "userID" | "createdAt">): Promise<Client> {
    const response = await api.post("/clients", data);
    return response.data;
  }

  async update(id: string, data: Partial<Omit<Client, "id" | "userID" | "createdAt">>): Promise<Client> {
    const response = await api.put(`/clients/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`/clients/${id}`);
  }
}

export default new ClientsService();
