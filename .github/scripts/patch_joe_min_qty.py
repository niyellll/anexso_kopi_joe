from pathlib import Path

path = Path('app/client-widgets.tsx')
s = path.read_text(encoding='utf-8')

s = s.replace(
    'const CART_EVENT = "anexso-cart-change";\n',
    'const CART_EVENT = "anexso-cart-change";\nconst JOE_COFFEE_MIN_QTY = 10;\n\nfunction minimumQty(product: Pick<Product, "category" | "kind">) {\n  return !product.category && !product.kind ? JOE_COFFEE_MIN_QTY : 1;\n}\n'
)

s = s.replace(
    '    return parsed.filter((item): item is CartItem => Boolean(item?.name && item?.image && item?.price && item?.qty));',
    '    return parsed\n      .filter((item): item is CartItem => Boolean(item?.name && item?.image && item?.price && item?.qty))\n      .map((item) => ({ ...item, qty: Math.max(minimumQty(item), Number(item.qty) || minimumQty(item)) }));'
)

s = s.replace(
    '? items.map((item) => item.name === product.name ? { ...item, qty: item.qty + 1 } : item)\n    : [...items, { ...product, qty: 1 }];',
    '? items.map((item) => item.name === product.name ? { ...item, qty: Math.max(minimumQty(item), item.qty + 1) } : item)\n    : [...items, { ...product, qty: minimumQty(product) }];'
)

s = s.replace(
    'const changeQty = (name: string, delta: number) => setItems((prev) => prev.map((item) => item.name === name ? { ...item, qty: Math.max(1, item.qty + delta) } : item));',
    'const changeQty = (name: string, delta: number) => setItems((prev) => prev.map((item) => item.name === name ? { ...item, qty: Math.max(minimumQty(item), item.qty + delta) } : item));'
)

s = s.replace(
    '<div className="qty"><button type="button" aria-label={`Kurangi ${item.name}`} onClick={() => changeQty(item.name, -1)}>−</button><span>{item.qty}</span><button type="button" aria-label={`Tambah ${item.name}`} onClick={() => changeQty(item.name, 1)}>+</button></div>',
    '<div className="qty"><button type="button" aria-label={`Kurangi ${item.name}`} disabled={item.qty <= minimumQty(item)} onClick={() => changeQty(item.name, -1)}>−</button><span>{item.qty}</span><button type="button" aria-label={`Tambah ${item.name}`} onClick={() => changeQty(item.name, 1)}>+</button></div>'
)

required = [
    'const JOE_COFFEE_MIN_QTY = 10;',
    'qty: minimumQty(product)',
    'Math.max(minimumQty(item), item.qty + delta)',
    'disabled={item.qty <= minimumQty(item)}',
]
for marker in required:
    if marker not in s:
        raise SystemExit(f'Patch marker missing: {marker}')

path.write_text(s, encoding='utf-8')
