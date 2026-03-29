const categories = [
  {
    title: 'Floor Tiles',
    description: 'Durable and elegant tiles designed to withstand heavy foot traffic while enhancing your space.',
    icon: '⬜'
  },
  {
    title: 'Wall Tiles',
    description: 'Stylish designs and finishes that elevate any interior wall with timeless elegance.',
    icon: '🧱'
  },
  {
    title: 'Bathroom Tiles',
    description: 'Water-resistant and anti-slip options perfect for wet areas and bathrooms.',
    icon: '🚿'
  },
  {
    title: 'Outdoor Tiles',
    description: 'Weather-resistant pavers and tiles built to withstand the elements outdoors.',
    icon: '🌿'
  }
];

function Categories() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <div className="category-card-icon">{category.icon}</div>
              <h3>{category.title}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;
