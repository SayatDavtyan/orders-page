import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaTruck, FaShieldAlt, FaClock, FaBox, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

const CourierLanding = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [calcData, setCalcData] = useState({
    type: 'documents',
    weight: '1',
    distance: '5',
    speed: 'standard',
    quantity: '1',
    from: '',
    to: ''
  });
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const calculatePrice = () => {
    const typePrice = { documents: 300, parcels: 500, cargo: 800 };
    const base = typePrice[calcData.type] || 300;
    const weightMultiplier = parseFloat(calcData.weight) || 1;
    const distanceMultiplier = (parseFloat(calcData.distance) || 5) / 5;
    const speedMultiplier = calcData.speed === 'express' ? 1.5 : 1;
    const quantity = parseInt(calcData.quantity) || 1;
    return Math.round(base * weightMultiplier * distanceMultiplier * speedMultiplier * quantity);
  };

  const handleContactSubmit = () => {
    if (!formData.name || !formData.contact) {
      alert('Пожалуйста, заполните все обязательные поля');
      return;
    }
    alert(`Спасибо, ${formData.name}! Мы свяжемся с вами в ближайшее время.`);
    setFormData({ name: '', contact: '', message: '' });
  };

  const handleOrderSubmit = () => {
    if (!calcData.from || !calcData.to) {
      alert('Пожалуйста, укажите адреса забора и доставки');
      return;
    }
    alert(`Заказ принят! Итоговая стоимость: ${calculatePrice()} ₽`);
    setIsOrderModalOpen(false);
  };

  const services = [
    { icon: <FaTruck />, title: 'Экспресс доставка', desc: 'Доставка за 2 часа по городу' },
    { icon: <FaBox />, title: 'Грузоперевозки', desc: 'От 1 кг до 500 кг' },
    { icon: <FaShieldAlt />, title: 'Страхование груза', desc: 'Полная защита вашего груза' },
    { icon: <FaClock />, title: 'Работаем 24/7', desc: 'Круглосуточная поддержка' }
  ];

  const reviews = [
    { name: 'Анна Петрова', rating: 5, text: 'Отличный сервис! Доставили документы за час.' },
    { name: 'Дмитрий К.', rating: 5, text: 'Профессиональная команда, рекомендую!' },
    { name: 'Ольга Смирнова', rating: 5, text: 'Быстро, качественно, недорого. Буду заказывать еще!' },
    { name: 'Иван Иванов', rating: 4, text: 'Своевременная доставка и внимательное обслуживание.' },
    { name: 'Елена Кузнецова', rating: 5, text: 'Очень удобное приложение для отслеживания заказов.' },
    { name: 'Сергей Михайлов', rating: 4, text: 'Цены немного выше, но сервис оправдывает.' }
  ];

  return (
    <div className="app">
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', sans-serif; color: #333; overflow-x: hidden; }
        .app { min-height: 100vh; }
        
        .header {
          position: fixed;
          top: 0;
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.2rem 2rem;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
       .logo {
  display: flex;
  align-items: center;
  height: 50px;
}

.logo img {
  height: 50px;
  width: auto;
  object-fit: contain;
}
        
        .nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }
        
        .nav a {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s;
          cursor: pointer;
        }
        
        .nav a:hover {
          opacity: 0.8;
        }
        
        .btn-order-open {
          padding: 0.8rem 2rem;
          border-radius: 50px;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: transform 0.3s;
        }
        
        .btn-order-open:hover {
          transform: translateY(-2px);
        }
        
        .hero {
          margin-top: 80px;
          min-height: 90vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
          padding: 4rem 2rem;
          color: white;
        }
        
        .hero-left h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        
        .hero-left p {
          font-size: 1.2rem;
          opacity: 0.95;
        }
        
        .hero-right {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        
        .calc-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .calc-tab {
          flex: 1;
          padding: 0.8rem;
          border: none;
          background: #f0f0f0;
          border-radius: 10px;
          cursor: pointer;
          font-weight: 600;
          color: #666;
          transition: all 0.3s;
        }
        
        .calc-tab.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .calc-group {
          margin-bottom: 1rem;
        }
        
        .calc-group label {
          display: block;
          margin-bottom: 0.4rem;
          font-weight: 600;
          color: #333;
          font-size: 0.9rem;
        }
        
        .calc-group input,
        .calc-group select {
          width: 100%;
          padding: 0.8rem;
          border: 1px solid #ddd;
          border-radius: 10px;
          font-size: 1rem;
          transition: border 0.3s;
        }
        
        .calc-group input:focus,
        .calc-group select:focus {
          outline: none;
          border-color: #667eea;
        }
        
        .price-display {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          margin-top: 1.5rem;
        }
        
        .price-display h3 {
          font-size: 1rem;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }
        
        .price-display .price {
          font-size: 2.5rem;
          font-weight: bold;
        }
        
        .services {
          padding: 5rem 2rem;
          background: #f8f9fa;
        }
        
        .section-title {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 3rem;
          color: #333;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .service-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
          transition: transform 0.3s;
        }
        
        .service-card:hover {
          transform: translateY(-5px);
        }
        
        .service-icon {
          font-size: 3rem;
          color: #667eea;
          margin-bottom: 1rem;
        }
        
        .service-card h3 {
          margin-bottom: 0.5rem;
          color: #333;
        }
        
        .service-card p {
          color: #666;
        }
        
        .reviews {
          padding: 5rem 2rem;
          background: white;
        }
        
        .review-card {
          background: white;
          padding: 2rem;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.08);
        }
        
        .review-header {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }
        
        .review-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.2rem;
          margin-right: 1rem;
        }
        
        .review-stars {
          color: #ffd700;
          font-size: 1rem;
        }
        
        .review-text {
          color: #666;
          line-height: 1.6;
          font-style: italic;
        }
        
        .contact {
          padding: 5rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .contact-form {
          max-width: 600px;
          margin: 0 auto;
          background: rgba(255,255,255,0.1);
          padding: 3rem;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 10px;
          background: rgba(255,255,255,0.9);
          color: #333;
          font-size: 1rem;
        }
        
        .form-group textarea {
          min-height: 120px;
          resize: vertical;
        }
        
        .btn-submit {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .btn-submit:hover {
          transform: translateY(-2px);
        }
        
        .footer {
          background: #1a1a2e;
          color: white;
          padding: 3rem 2rem 1rem;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.5);
        }
        
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
          padding: 1rem;
        }
        
        .modal-content {
          background: #fff;
          border-radius: 20px;
          padding: 2rem;
          width: 100%;
          max-width: 520px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        
        
        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          font-size: 2rem;
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          line-height: 1;
        }
        
        .modal-title {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          color: #333;
        }
        
        .order-total {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: #fff;
          padding: 1.5rem;
          border-radius: 12px;
          text-align: center;
          margin: 1.5rem 0;
        }
        
        .total-price {
          font-size: 2rem;
          font-weight: bold;
          margin-top: 0.5rem;
        }
        
        .btn-order {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #f093fb, #f5576c);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .btn-order:hover {
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .nav {
            flex-direction: column;
            gap: 1rem;
          }
          
          .hero {
            grid-template-columns: 1fr;
            padding: 2rem 1rem;
          }
          
          .hero-left h1 {
            font-size: 2rem;
          }
          
          .calc-tabs {
            flex-direction: column;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <header className="header">
        <div className="logo"><img src="/logo.png" /></div>
        <nav className="nav">
          <a onClick={() => document.getElementById('home').scrollIntoView({ behavior: 'smooth' })}>Главная</a>
          <a onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>Услуги</a>
          <a onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>Контакты</a>
          <button className="btn-order-open" onClick={() => setIsOrderModalOpen(true)}>
            Оформить заказ
          </button>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-left">
          <h1>Быстрая доставка по городу</h1>
          <p>Документы, посылки и грузы — точно в срок</p>
        </div>
        
        <div className="hero-right">
          <div className="calc-tabs">
            <button 
              className={`calc-tab ${calcData.type === 'documents' ? 'active' : ''}`}
              onClick={() => setCalcData({ ...calcData, type: 'documents' })}
            >
              Документы
            </button>
            <button 
              className={`calc-tab ${calcData.type === 'parcels' ? 'active' : ''}`}
              onClick={() => setCalcData({ ...calcData, type: 'parcels' })}
            >
              Посылки
            </button>
            <button 
              className={`calc-tab ${calcData.type === 'cargo' ? 'active' : ''}`}
              onClick={() => setCalcData({ ...calcData, type: 'cargo' })}
            >
              Грузы
            </button>
          </div>

          <div className="calc-group">
            <label>Откуда забрать</label>
            <input
              type="text"
              placeholder="Адрес забора"
              value={calcData.from}
              onChange={(e) => setCalcData({ ...calcData, from: e.target.value })}
            />
          </div>

          <div className="calc-group">
            <label>Куда доставить</label>
            <input
              type="text"
              placeholder="Адрес доставки"
              value={calcData.to}
              onChange={(e) => setCalcData({ ...calcData, to: e.target.value })}
            />
          </div>

          <div className="calc-group">
            <label>Вес груза (кг)</label>
            <input
              type="number"
              min="1"
              value={calcData.weight}
              onChange={(e) => setCalcData({ ...calcData, weight: e.target.value })}
            />
          </div>

          <div className="calc-group">
            <label>Расстояние (км)</label>
            <input
              type="number"
              min="1"
              value={calcData.distance}
              onChange={(e) => setCalcData({ ...calcData, distance: e.target.value })}
            />
          </div>

          <div className="calc-group">
            <label>Скорость доставки</label>
            <select
              value={calcData.speed}
              onChange={(e) => setCalcData({ ...calcData, speed: e.target.value })}
            >
              <option value="standard">Стандартная</option>
              <option value="express">Экспресс (+50%)</option>
            </select>
          </div>

          <div className="calc-group">
            <label>Количество</label>
            <input
              type="number"
              min="1"
              value={calcData.quantity}
              onChange={(e) => setCalcData({ ...calcData, quantity: e.target.value })}
            />
          </div>

          <div className="price-display">
            <h3>Стоимость доставки:</h3>
            <div className="price">{calculatePrice()} ₽</div>
          </div>
        </div>
      </section>

      <section id="services" className="services">
        <h2 className="section-title">Наши услуги</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reviews">
        <h2 className="section-title">Отзывы клиентов</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          loop={true}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="review-card">
                <div className="review-header">
                  <div className="review-avatar">{review.name[0]}</div>
                  <div>
                    <h4>{review.name}</h4>
                    <div className="review-stars">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section id="contact" className="contact">
        <h2 className="section-title">Свяжитесь с нами</h2>
        <div className="contact-form">
          <div className="form-group">
            <label>Ваше имя</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Телефон или Email</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Сообщение</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>
          <button className="btn-submit" onClick={handleContactSubmit}>
            Отправить заявку
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>О компании</h3>
            <p>FastDeliver - надежная курьерская служба с 10-летним опытом работы на рынке.</p>
          </div>
          <div className="footer-section">
            <h3>Контакты</h3>
            <p><FaPhone /> +7 (999) 123-45-67</p>
            <p><FaEnvelope /> info@fastdeliver.ru</p>
            <p><FaMapMarkerAlt /> г. Москва, ул. Примерная, д. 1</p>
          </div>
          <div className="footer-section">
            <h3>Режим работы</h3>
            <p>Круглосуточно, 24/7</p>
            <p>Без выходных и праздников</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 FastDeliver. Все права защищены.</p>
        </div>
      </footer>

      {isOrderModalOpen && (
        <div className="modal-overlay" onClick={() => setIsOrderModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsOrderModalOpen(false)}>
              ×
            </button>
            <h2 className="modal-title">Оформить заказ</h2>

            <div className="calc-group">
              <label>Тип доставки</label>
              <select
                value={calcData.type}
                onChange={(e) => setCalcData({ ...calcData, type: e.target.value })}
              >
                <option value="documents">Документы</option>
                <option value="parcels">Посылки</option>
                <option value="cargo">Грузы</option>
              </select>
            </div>

            <div className="calc-group">
              <label>Откуда забрать</label>
              <input
                type="text"
                placeholder="Адрес забора"
                value={calcData.from}
                onChange={(e) => setCalcData({ ...calcData, from: e.target.value })}
              />
            </div>

            <div className="calc-group">
              <label>Куда доставить</label>
              <input
                type="text"
                placeholder="Адрес доставки"
                value={calcData.to}
                onChange={(e) => setCalcData({ ...calcData, to: e.target.value })}
              />
            </div>

            <div className="calc-group">
              <label>Вес (кг)</label>
              <input
                type="number"
                min="1"
                value={calcData.weight}
                onChange={(e) => setCalcData({ ...calcData, weight: e.target.value })}
              />
            </div>

            <div className="calc-group">
              <label>Расстояние (км)</label>
              <input
                type="number"
                min="1"
                value={calcData.distance}
                onChange={(e) => setCalcData({ ...calcData, distance: e.target.value })}
              />
            </div>

            <div className="calc-group">
              <label>Скорость доставки</label>
              <select
                value={calcData.speed}
                onChange={(e) => setCalcData({ ...calcData, speed: e.target.value })}
              >
                <option value="standard">Стандартная</option>
                <option value="express">Экспресс (+50%)</option>
              </select>
            </div>

            <div className="calc-group">
              <label>Количество</label>
              <input
                type="number"
                min="1"
                value={calcData.quantity}
                onChange={(e) => setCalcData({ ...calcData, quantity: e.target.value })}
              />
            </div>

            <div className="order-total">
              <h3>Итоговая стоимость</h3>
              <div className="total-price">{calculatePrice()} ₽</div>
            </div>

            <button className="btn-order" onClick={handleOrderSubmit}>
              Перейти к оплате
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourierLanding;
