import { useState, FormEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Trash2 } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

const defaultProducts: Product[] = [
  { id: 1, name: 'Notebook', quantity: 10, price: 3500.00 },
  { id: 2, name: 'Mouse', quantity: 50, price: 89.90 },
  { id: 3, name: 'Teclado', quantity: 30, price: 120.50 },
];

function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      return JSON.parse(savedProducts);
    }
    return defaultProducts;
  });

  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productPrice, setProductPrice] = useState('');

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleAddProduct = (event: FormEvent) => {
    event.preventDefault();

    const quantity = parseInt(productQuantity, 10);
    const price = parseFloat(productPrice);

    if (productName && !isNaN(quantity) && quantity > 0 && !isNaN(price) && price > 0) {
      const newProduct: Product = {
        id: Date.now(), // Simple unique ID
        name: productName,
        quantity,
        price,
      };

      setProducts([...products, newProduct]);

      // Reset form fields
      setProductName('');
      setProductQuantity('');
      setProductPrice('');
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  const handleDeleteProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <main className="container mx-auto p-4">
      <header className="my-8">
        <h1 className="text-4xl font-bold text-center">Controle de Estoque</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Produto</CardTitle>
              <CardDescription>Preencha os dados para cadastrar um novo item.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    placeholder="Nome do produto"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Preço (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Inventário</CardTitle>
              <CardDescription>Lista de todos os produtos em estoque.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produto</TableHead>
                    <TableHead className="text-center">Quantidade</TableHead>
                    <TableHead className="text-right">Preço Unitário</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell className="text-center">{product.quantity}</TableCell>
                      <TableCell className="text-right">
                        {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default App