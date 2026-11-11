import { useMemo, useState, type FormEvent } from 'react';
import { products, formatPrice, type Product } from '../data/products';
import '../dashboard.css';

type Leader = { id: string; name: string; role: string; phone: string; email: string; status: 'Active' | 'Invited' };
type Task = { id: number; title: string; owner: string; due: string; done: boolean; group: string };
type Section = 'Overview' | 'Products' | 'Team' | 'Tasks' | 'Inventory';
type ManagedProduct = Product & { stock: number };
const seedLeaders: Leader[] = [
  { id: 'alliance', name: 'Umurungi Alliance', role: 'Cooperative President', phone: '+250 798 529 635', email: 'alliance@kotwinya.rw', status: 'Active' },
  { id: 'gedeon', name: 'Twizerimana Gedeon', role: 'Digital Market Lead', phone: '+250 783 801 966', email: 'gedeon@kotwinya.rw', status: 'Active' },
  { id: 'rukundo', name: 'Mukabutera Rukundo', role: 'Finance Manager', phone: '+250 791 143 414', email: 'rukundo@kotwinya.rw', status: 'Active' },
];
const seedTasks: Task[] = [
  { id: 1, title: 'Confirm weekly soap production plan', owner: 'Umurungi Alliance', due: 'Today', done: false, group: 'Production' },
  { id: 2, title: 'Update wholesale customer price list', owner: 'Twizerimana Gedeon', due: 'Tomorrow', done: false, group: 'Sales' },
  { id: 3, title: 'Reconcile October cooperative expenses', owner: 'Mukabutera Rukundo', due: 'Nov 14', done: false, group: 'Finance' },
  { id: 4, title: 'Order bottles and packaging labels', owner: 'Umurungi Alliance', due: 'Nov 16', done: true, group: 'Production' },
];
const readStore = <T,>(key: string, fallback: T): T => {
  try { const value = localStorage.getItem(`kotwinya-dashboard-${key}`); return value ? JSON.parse(value) as T : fallback; } catch { return fallback; }
};
const saveStore = <T,>(key: string, value: T) => localStorage.setItem(`kotwinya-dashboard-${key}`, JSON.stringify(value));

function Dashboard() {
  const [section, setSection] = useState<Section>('Overview');
  const [items, setItems] = useState<ManagedProduct[]>(() => readStore<ManagedProduct[]>('products', products.map((product, index) => ({ ...product, stock: [24, 8, 16, 6, 12, 18][index] ?? 0 })).map((product) => ({ ...product, stock: product.stock ?? 0 }))));
  const [leaders, setLeaders] = useState<Leader[]>(() => readStore('leaders', seedLeaders));
  const [tasks, setTasks] = useState<Task[]>(() => readStore('tasks', seedTasks));
  const [query, setQuery] = useState('');
  const [modal, setModal] = useState<'product' | 'leader' | 'task' | null>(null);
  const [notice, setNotice] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const updateItems = (next: ManagedProduct[]) => { setItems(next); saveStore('products', next); };
  const updateLeaders = (next: Leader[]) => { setLeaders(next); saveStore('leaders', next); };
  const updateTasks = (next: Task[]) => { setTasks(next); saveStore('tasks', next); };
  const filteredProducts = useMemo(() => items.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())), [items, query]);
  const completedTasks = tasks.filter((task) => task.done).length;
  const lowStock = items.filter((product) => product.stock < 10).length;
  const saveProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const product: ManagedProduct = { id: `product-${Date.now()}`, name: String(data.get('name')), category: data.get('category') as Product['category'], size: String(data.get('size')), description: String(data.get('description')), price: Number(data.get('price')), image: String(data.get('image') || '/images/liquid.jpg'), alt: String(data.get('name')), stock: Number(data.get('stock') || 0) };
    updateItems([...items, product]); setModal(null); setNotice(`${product.name} added to the product list.`);
  };
  const saveLeader = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    const leader: Leader = { id: `leader-${Date.now()}`, name: String(data.get('name')), role: String(data.get('role')), phone: String(data.get('phone')), email: String(data.get('email')), status: 'Invited' };
    updateLeaders([...leaders, leader]); setModal(null); setNotice(`${leader.name} added to the team.`);
  };
  const saveTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const data = new FormData(event.currentTarget);
    updateTasks([...tasks, { id: Date.now(), title: String(data.get('title')), owner: String(data.get('owner')), due: String(data.get('due')), done: false, group: String(data.get('group')) }]); setModal(null); setNotice('Task added to the team board.');
  };
  const removeProduct = (id: string) => { const product = items.find((entry) => entry.id === id); updateItems(items.filter((entry) => entry.id !== id)); setNotice(`${product?.name ?? 'Product'} removed.`); };
  const toggleTask = (id: number) => updateTasks(tasks.map((task) => task.id === id ? { ...task, done: !task.done } : task));
  const nav: Section[] = ['Overview', 'Products', 'Team', 'Tasks', 'Inventory'];

  return <div className="dash-shell">
    <aside className={`dash-sidebar${mobileMenu ? ' is-open' : ''}`}>
      <a href="/" className="dash-brand"><span className="brand-mark">K</span><span><b>KOTWINYA</b><small>COOPERATIVE</small></span></a>
      <div className="dash-workspace"><span className="workspace-icon">✿</span><span><b>Nyabiheke Cooperative</b><small>Workspace</small></span><span className="workspace-chevron">⌄</span></div>
      <span className="dash-label">WORKSPACE</span>
      <nav className="dash-nav" aria-label="Dashboard sections">{nav.map((item, index) => <button key={item} className={section === item ? 'active' : ''} onClick={() => { setSection(item); setMobileMenu(false); }}><span className="nav-icon">{['▦', '◈', '♙', '✓', '▤'][index]}</span>{item}{item === 'Tasks' && <i>{tasks.filter((task) => !task.done).length}</i>}</button>)}</nav>
      <div className="sidebar-bottom"><div className="help-card"><span>✳</span><b>Need a hand?</b><p>Get help managing your cooperative workspace.</p><a href="mailto:info@kotwinya.rw">Contact support <span>↗</span></a></div><button className="profile-button"><span className="profile-avatar">TG</span><span><b>Twizerimana Gedeon</b><small>Workspace admin</small></span><span className="profile-dots">···</span></button></div>
    </aside>
    <div className="dash-main">
      <header className="dash-topbar"><button className="dash-mobile-toggle" aria-label="Open dashboard menu" onClick={() => setMobileMenu(!mobileMenu)}>☰</button><div className="breadcrumbs"><a href="/">KOTWINYA</a><span>/</span><b>{section}</b></div><div className="topbar-actions"><span className="today-label">Tue, November 11, 2026</span><button className="icon-button" aria-label="Notifications" onClick={() => setNotice('You’re all caught up. No new notifications.')}>♧<i /></button><span className="topbar-avatar">TG</span></div></header>
      <main className="dash-content"><div className="dash-heading"><div><div className="dash-eyebrow"><span>✳</span> YOUR COOPERATIVE AT A GLANCE</div><h1>{section === 'Overview' ? 'Good morning, Gedeon' : section}</h1><p>{section === 'Overview' ? 'Here’s what’s happening with your cooperative today.' : `Manage your cooperative ${section.toLowerCase()} in one place.`}</p></div><div className="heading-actions"><button className="outline-button" onClick={() => setNotice('Your cooperative report is ready to review.')}>↧ &nbsp;Export report</button><button className="solid-button" onClick={() => setModal(section === 'Team' ? 'leader' : section === 'Tasks' ? 'task' : 'product')}>＋ &nbsp;{section === 'Team' ? 'Add team leader' : section === 'Tasks' ? 'Add a task' : 'Add product'}</button></div></div>
      {notice && <div className="dash-notice" role="status"><span>✓</span>{notice}<button aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button></div>}
      {section === 'Overview' && <>
        <div className="metric-grid"><article className="metric-card"><div className="metric-top"><span className="metric-icon mint">◈</span><span className="metric-trend">↗ 12.8%</span></div><small>PRODUCTS</small><strong>{items.length}</strong><span className="metric-foot">Across {new Set(items.map((item) => item.category)).size} categories</span></article><article className="metric-card"><div className="metric-top"><span className="metric-icon blue">♙</span><span className="metric-note">This month</span></div><small>TEAM MEMBERS</small><strong>{leaders.length}</strong><span className="metric-foot">{leaders.filter((leader) => leader.status === 'Active').length} active members</span></article><article className="metric-card"><div className="metric-top"><span className="metric-icon yellow">✓</span><span className="metric-note">This week</span></div><small>TASKS COMPLETED</small><strong>{completedTasks}<em> / {tasks.length}</em></strong><span className="metric-progress"><i style={{ width: `${tasks.length ? completedTasks / tasks.length * 100 : 0}%` }} /></span></article><article className="metric-card"><div className="metric-top"><span className="metric-icon coral">▤</span><span className="metric-alert">{lowStock ? `${lowStock} needs attention` : 'All looking good'}</span></div><small>LOW STOCK ITEMS</small><strong>{lowStock}</strong><span className="metric-foot">{lowStock ? 'Review your inventory' : 'Inventory levels on track'}</span></article></div>
        <div className="dash-columns"><section className="panel task-panel"><div className="panel-heading"><div><h2>Team tasks</h2><p>Keep your cooperative moving forward.</p></div><button className="subtle-button" onClick={() => setSection('Tasks')}>View all <span>→</span></button></div><div className="task-list">{tasks.slice(0, 4).map((task) => <label className={`task-row${task.done ? ' is-done' : ''}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} /><span className="task-copy"><b>{task.title}</b><small>{task.owner} <i>·</i> {task.group}</small></span><span className={`due-pill${task.due === 'Today' && !task.done ? ' due-today' : ''}`}>{task.due}</span></label>)}</div><button className="add-task-link" onClick={() => setModal('task')}>＋ Add a task</button></section><section className="panel team-panel"><div className="panel-heading"><div><h2>Your team</h2><p>People building KOTWINYA together.</p></div><button className="subtle-button" onClick={() => setSection('Team')}>View all <span>→</span></button></div><div className="team-list">{leaders.slice(0, 4).map((leader, index) => <div className="team-row" key={leader.id}><span className={`team-initials color-${index % 4}`}>{leader.name.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span><span className="team-person"><b>{leader.name}</b><small>{leader.role}</small></span><span className={`status-pill ${leader.status.toLowerCase()}`}>{leader.status}</span></div>)}</div><button className="add-task-link" onClick={() => setModal('leader')}>＋ Add a team leader</button></section></div>
        <section className="panel product-panel"><div className="panel-heading"><div><h2>Product catalogue</h2><p>Your cooperative’s products and current prices.</p></div><button className="subtle-button" onClick={() => setSection('Products')}>Manage products <span>→</span></button></div><ProductTable entries={items.slice(0, 4)} onRemove={removeProduct} /></section>
      </>}
      {section === 'Products' && <section className="panel full-panel"><div className="table-tools"><label className="search-box"><span>⌕</span><input placeholder="Search products..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><span className="result-count">{filteredProducts.length} products</span></div><ProductTable entries={filteredProducts} onRemove={removeProduct} /></section>}
      {section === 'Inventory' && <section className="panel full-panel"><div className="panel-heading"><div><h2>Inventory levels</h2><p>Adjust the quantity on hand for each product.</p></div><span className="status-pill">{lowStock} low stock</span></div><div className="inventory-list">{items.map((product) => <div className="inventory-row" key={product.id}><img src={product.image} alt=""/><span className="inventory-name"><b>{product.name}</b><small>{product.size}</small></span><span className={`stock-indicator ${product.stock < 10 ? 'stock-low' : ''}`}><i/>{product.stock < 10 ? 'Low stock' : 'In stock'}</span><div className="stock-controls"><button aria-label={`Decrease ${product.name} stock`} onClick={() => updateItems(items.map((item) => item.id === product.id ? { ...item, stock: Math.max(0, item.stock - 1) } : item))}>−</button><b>{product.stock}</b><button aria-label={`Increase ${product.name} stock`} onClick={() => updateItems(items.map((item) => item.id === product.id ? { ...item, stock: item.stock + 1 } : item))}>＋</button></div></div>)}</div></section>}
      {section === 'Team' && <section className="panel full-panel"><div className="panel-heading"><div><h2>Cooperative leadership</h2><p>Manage roles and contact details for your team.</p></div><button className="solid-button" onClick={() => setModal('leader')}>＋ Add team leader</button></div><div className="leader-grid">{leaders.map((leader, index) => <article className="leader-card" key={leader.id}><button className="leader-menu" aria-label={`Remove ${leader.name}`} onClick={() => { updateLeaders(leaders.filter((item) => item.id !== leader.id)); setNotice(`${leader.name} removed from the team.`); }}>···</button><span className={`leader-avatar color-${index % 4}`}>{leader.name.split(' ').slice(0, 2).map((word) => word[0]).join('')}</span><h3>{leader.name}</h3><p>{leader.role}</p><span className={`status-pill ${leader.status.toLowerCase()}`}>{leader.status}</span><div className="leader-contact"><a href={`tel:${leader.phone.replaceAll(' ', '')}`}>↗ &nbsp;{leader.phone || 'Add phone'}</a><a href={`mailto:${leader.email}`}>✉ &nbsp;{leader.email || 'Add email'}</a></div></article>)}</div></section>}
      {section === 'Tasks' && <section className="panel full-panel"><div className="panel-heading"><div><h2>Team task board</h2><p>{completedTasks} of {tasks.length} tasks completed.</p></div><button className="solid-button" onClick={() => setModal('task')}>＋ Add a task</button></div><div className="task-list task-list-full">{tasks.map((task) => <div className={`task-row${task.done ? ' is-done' : ''}`} key={task.id}><input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} /><span className="task-copy"><b>{task.title}</b><small>{task.owner} <i>·</i> {task.group}</small></span><span className={`due-pill${task.due === 'Today' && !task.done ? ' due-today' : ''}`}>{task.due}</span><button className="remove-task" aria-label="Delete task" onClick={() => updateTasks(tasks.filter((item) => item.id !== task.id))}>×</button></div>)}</div></section>}
      <footer className="dash-footer"><span>© 2026 KOTWINYA Cooperative</span><a href="/">← Back to storefront</a><span>Made with care in Rwanda <i>✳</i></span></footer>
      </main>
    </div>
    {mobileMenu && <button className="dash-scrim" aria-label="Close dashboard menu" onClick={() => setMobileMenu(false)} />}
    {modal && <div className="modal-backdrop" role="presentation" onClick={() => setModal(null)}><section className="dash-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Close" onClick={() => setModal(null)}>×</button><span className="dash-eyebrow">✳ &nbsp;KOTWINYA WORKSPACE</span><h2>{modal === 'product' ? 'Add a product' : modal === 'leader' ? 'Add a team leader' : 'Create a task'}</h2><p>{modal === 'product' ? 'Add an item to your cooperative product catalogue.' : modal === 'leader' ? 'Add a cooperative member and their contact details.' : 'Assign work and keep your team moving.'}</p>
      <form onSubmit={modal === 'product' ? saveProduct : modal === 'leader' ? saveLeader : saveTask}>
        {modal === 'product' && <><label>Product name<input name="name" required placeholder="e.g. Lavender Hand Soap" /></label><div className="modal-fields"><label>Category<select name="category"><option value="soap">Soap</option><option value="home-care">Home care</option></select></label><label>Size / pack<input name="size" required placeholder="e.g. 1 litre" /></label></div><div className="modal-fields"><label>Price (RWF)<input name="price" type="number" min="0" required placeholder="5000" /></label><label>Opening stock<input name="stock" type="number" min="0" defaultValue="0" /></label></div><label>Image path<input name="image" placeholder="/images/liquid.jpg" /></label><label>Description<textarea name="description" required rows={3} placeholder="Describe this product..." /></label></>}
        {modal === 'leader' && <><label>Full name<input name="name" required placeholder="e.g. Aline Mukamana" /></label><label>Role<input name="role" required placeholder="e.g. Production Lead" /></label><div className="modal-fields"><label>Phone<input name="phone" type="tel" placeholder="+250 ..." /></label><label>Email<input name="email" type="email" placeholder="name@kotwinya.rw" /></label></div></>}
        {modal === 'task' && <><label>Task title<input name="title" required placeholder="What needs to get done?" /></label><div className="modal-fields"><label>Assign to<select name="owner">{leaders.map((leader) => <option key={leader.id}>{leader.name}</option>)}</select></label><label>Team<select name="group"><option>Production</option><option>Sales</option><option>Finance</option><option>Operations</option></select></label></div><label>Due date<input name="due" type="date" required /></label></>}
        <div className="modal-actions"><button type="button" className="outline-button" onClick={() => setModal(null)}>Cancel</button><button className="solid-button" type="submit">{modal === 'product' ? 'Save product' : modal === 'leader' ? 'Add team leader' : 'Create task'}</button></div>
      </form></section></div>}
  </div>;
}

function ProductTable({ entries, onRemove }: { entries: ManagedProduct[]; onRemove: (id: string) => void }) {
  return <div className="table-scroll"><table className="product-table"><thead><tr><th>PRODUCT</th><th>CATEGORY</th><th>SIZE</th><th>PRICE</th><th>STOCK STATUS</th><th></th></tr></thead><tbody>{entries.map((product) => <tr key={product.id}><td><span className="product-cell"><img src={product.image} alt="" /><span><b>{product.name}</b><small>{product.id}</small></span></span></td><td><span className="category-pill">{product.category === 'soap' ? 'Soap' : 'Home care'}</span></td><td>{product.size}</td><td className="price-cell">{formatPrice(product.price)} <small>RWF</small></td><td><span className={`stock-indicator ${product.stock < 10 ? 'stock-low' : ''}`}><i />{product.stock < 10 ? `${product.stock} in stock` : 'In stock'}</span></td><td><button className="row-menu" aria-label={`Remove ${product.name}`} onClick={() => onRemove(product.id)}>···</button></td></tr>)}</tbody></table>{entries.length === 0 && <div className="empty-state">No products match your search.</div>}</div>;
}

export default Dashboard;
