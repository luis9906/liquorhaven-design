interface ProductStatsProps {
  products: Array<{
    stock: number;
  }>;
}

export const ProductStats = ({ products }: ProductStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-black/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium">Total Productos</h3>
        <p className="text-2xl font-bold">{products.length}</p>
      </div>
      <div className="bg-black/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium">En Stock</h3>
        <p className="text-2xl font-bold">
          {products.filter(p => p.stock > 0).length}
        </p>
      </div>
      <div className="bg-black/30 p-4 rounded-lg">
        <h3 className="text-lg font-medium">Sin Stock</h3>
        <p className="text-2xl font-bold">
          {products.filter(p => !p.stock || p.stock === 0).length}
        </p>
      </div>
    </div>
  );
};