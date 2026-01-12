import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FaTruck, FaShieldAlt, FaClock, FaBox, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import './App.css';

const CourierLanding = () => {
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [calcData, setCalcData] = useState({ weight: '1', distance: '5', speed: 'standard' });

  useEffect(() => { AOS.init({ duration: 1000, once: true, offset: 100 }); }, []);

  const calculatePrice = () => {
    const basePrice = 500;
    const weightMultiplier = parseFloat(calcData.weight);
    const distanceMultiplier = parseFloat(calcData.distance) / 5;
    const speedMultiplier = calcData.speed === 'express' ? 1.5 : 1;
    return Math.round(basePrice * weightMultiplier * distanceMultiplier * speedMultiplier);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Спасибо, ${formData.name}! Мы свяжемся с вами в ближайшее время.`);
    setFormData({ name: '', contact: '', message: '' });
  };

  const services = [
    { icon: <FaTruck />, title: 'Экспресс доставка', desc: 'Доставка за 2 часа по городу', color: '#FF6B6B' },
    { icon: <FaBox />, title: 'Грузоперевозки', desc: 'От 1 кг до 500 кг', color: '#4ECDC4' },
    { icon: <FaShieldAlt />, title: 'Страхование груза', desc: 'Полная защита вашего груза', color: '#FFE66D' },
    { icon: <FaClock />, title: 'Работаем 24/7', desc: 'Круглосуточная поддержка', color: '#A8E6CF' }
  ];

  const reviews = [
    { name: 'Анна Петрова', rating: 5, text: 'Отличный сервис! Доставили документы за час.' },
    { name: 'Дмитрий К.', rating: 5, text: 'Профессиональная команда, рекомендую!' },
    { name: 'Ольга Смирнова', rating: 5, text: 'Быстро, качественно, недорого. Буду заказывать еще!' },
    { name: 'Иван Иванов', rating: 4, text: 'Своевременная доставка и внимательное обслуживание.' },
    { name: 'Елена Кузнецова', rating: 5, text: 'Очень удобное приложение для отслеживания заказов.' },
    { name: 'Сергей Михайлов', rating: 4, text: 'Цены немного выше, но сервис оправдывает.' },
    { name: 'Мария Васильева', rating: 5, text: 'Доставка вовремя, вежливые курьеры.' },
    { name: 'Алексей Смирнов', rating: 4, text: 'Удобный сервис и простая форма заказа.' }
  ];

  // Состояния
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    type: 'documents',
    size: 'small',
    quantity: 1,
    address: ''
  });

  // Рассчитать цену
  const calculateOrderPrice = () => {
    const typePrice = { documents: 300, parcels: 500, cargo: 800 };
    const sizeMultiplier = { small: 1, medium: 1.5, large: 2 };
    const base = typePrice[orderData.type] || 300;
    const multiplier = sizeMultiplier[orderData.size] || 1;
    const qty = parseInt(orderData.quantity) || 1;
    return Math.round(base * multiplier * qty);
  };

  // Отправка заказа
  const handleOrderSubmit = () => {
    if (!orderData.address || !orderData.quantity) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    alert(`Заказ принят! Итоговая стоимость: ${calculateOrderPrice()} ₽`);
    setIsOrderModalOpen(false);
    setOrderData({ type: 'documents', size: 'small', quantity: 1, address: '' });
  };


  return (
    <div className="app">
      <style>{`*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;color:#333;overflow-x:hidden}.app{min-height:100vh}.header{position:fixed;top:0;width:100%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;padding:1.2rem 2rem;box-shadow:0 4px 20px rgba(0,0,0,0.1);z-index:1000;display:flex;justify-content:space-between;align-items:center}.logo{font-size:1.8rem;font-weight:bold;background:linear-gradient(45deg,#fff,#f0f0f0);-webkit-background-clip:text;-webkit-text-fill-color:transparent;text-shadow:2px 2px 4px rgba(0,0,0,0.2)}.nav{display:flex;gap:2rem;align-items:center}.nav a{color:white;text-decoration:none;font-weight:500;transition:all 0.3s;position:relative}.nav a:hover{transform:translateY(-2px)}.nav a::after{content:'';position:absolute;bottom:-5px;left:0;width:0;height:2px;background:white;transition:width 0.3s}.nav a:hover::after{width:100%}.btn-primary{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:white;border:none;padding:0.8rem 2rem;border-radius:50px;font-weight:600;cursor:pointer;transition:all 0.3s;box-shadow:0 4px 15px rgba(245,87,108,0.3)}.btn-primary:hover{transform:translateY(-3px);box-shadow:0 6px 25px rgba(245,87,108,0.5)}.hero{margin-top:80px;min-height:90vh;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;text-align:center;color:white;padding:4rem 2rem;position:relative;overflow:hidden}.hero-content{max-width:800px;z-index:1}.hero h1{text-align:center;font-size:3.5rem;margin-bottom:1.5rem;line-height:1.2;text-shadow:2px 2px 8px rgba(0,0,0,0.2)}.hero p{text-align:center;font-size:1.3rem;margin-bottom:2rem;opacity:0.95}.services,.calculator,.reviews,.contact{padding:5rem 2rem}.section-title{text-align:center;font-size:2.5rem;margin-bottom:3rem;color:#333}.section-title::after{content:'';display:block;margin:0.5rem auto 0;width:60px;height:4px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:2px}.services-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-top:3rem}.service-card{background:white;padding:2rem;border-radius:20px;text-align:center;transition:all 0.3s;box-shadow:0 10px 30px rgba(0,0,0,0.1);position:relative;overflow:hidden}.service-card:hover{transform:translateY(-10px);box-shadow:0 15px 40px rgba(0,0,0,0.15)}.service-icon{font-size:3rem;margin-bottom:1rem}.calculator{background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:white}.calc-container{max-width:600px;margin:0 auto;background:rgba(255,255,255,0.1);padding:3rem;border-radius:20px;backdrop-filter:blur(10px);box-shadow:0 15px 50px rgba(0,0,0,0.2)}.calc-group{margin-bottom:2rem}.calc-group label{display:block;margin-bottom:0.5rem;font-weight:600;font-size:1.1rem}.calc-group input,.calc-group select{width:100%;padding:1rem;border:2px solid rgba(255,255,255,0.3);border-radius:10px;background:rgba(255,255,255,0.9);color:#333;font-size:1rem;transition:all 0.3s}.price-result{text-align:center;margin-top:2rem;padding:2rem;background:rgba(255,255,255,0.2);border-radius:15px}.price-result h3{font-size:1.5rem;margin-bottom:0.5rem}.price-result .price{font-size:3rem;font-weight:bold;text-shadow:2px 2px 8px rgba(0,0,0,0.2)}.reviews{background:#f8f9fa}.review-card{background:white;padding:2rem;border-radius:15px;box-shadow:0 10px 30px rgba(0,0,0,0.1);height:auto}.review-header{display:flex;align-items:center;margin-bottom:1rem}.review-avatar{width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:1.2rem;margin-right:1rem}.review-stars{color:#ffd700;font-size:1.2rem}.review-text{color:#666;line-height:1.6;font-style:italic}.contact{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white}.contact-form{max-width:600px;margin:0 auto;background:rgba(255,255,255,0.1);padding:3rem;border-radius:20px;backdrop-filter:blur(10px)}.form-group{margin-bottom:1.5rem}.form-group label{display:block;margin-bottom:0.5rem;font-weight:600}.form-group input,.form-group textarea{width:100%;padding:1rem;border:2px solid rgba(255,255,255,0.3);border-radius:10px;background:rgba(255,255,255,0.9);color:#333;font-size:1rem;transition:all 0.3s}.form-group textarea{min-height:120px;resize:vertical}.btn-submit{width:100%;padding:1rem;background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:white;border:none;border-radius:10px;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all 0.3s}.footer{background:#1a1a2e;color:white;padding:3rem 2rem 1rem}.footer-content{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:2rem;margin-bottom:2rem}.footer-bottom{text-align:center;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5)}@media(max-width:768px){.header{flex-direction:column;gap:1rem}.nav{flex-direction:column;gap:1rem}.hero h1{font-size:2rem}.hero p{font-size:1rem}.section-title{font-size:1.8rem}.services-grid{grid-template-columns:1fr}}`}</style>

      <header className="header">
        <div className="logo">⚡ FastDeliver</div>
        <nav className="nav">
          <a href="#home">Главная</a>
          <a href="#services">Услуги</a>
          <a href="#contact">Контакты</a>
          <button className="btn-order-open" onClick={() => setIsOrderModalOpen(true)}>Оформить заказ</button>
        </nav>
      </header>

      <section id="home" className="hero">
        <div className="hero-content" data-aos="fade-up">
          <h1>Быстрая доставка по всему городу</h1>
          <p>Мы доставим ваш груз точно в срок. Работаем 24/7 для вашего удобства!</p>
          <button
  className="btn-primary"
  onClick={() => document.getElementById('calculator-section').scrollIntoView({ behavior: 'smooth' })}
>
  Рассчитать стоимость
</button>
        </div>
      </section>

      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Наши услуги</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" style={{ '--card-color': service.color }} data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     <section id="calculator-section" className="calculator">
  <div className="container">
    <h2 className="section-title" data-aos="fade-up">Калькулятор стоимости</h2>
    <div className="calc-container" data-aos="zoom-in">

      {/* Тип груза */}
      <div className="calc-group">
        <label>Тип груза</label>
        <select
          value={calcData.type}
          onChange={(e) => setCalcData({ ...calcData, type: e.target.value })}
        >
          <option value="documents">Документы</option>
          <option value="parcels">Посылки</option>
          <option value="cargo">Грузы</option>
        </select>
      </div>

      {/* Размер */}
      <div className="calc-group">
        <label>Размер</label>
        <select
          value={calcData.size}
          onChange={(e) => setCalcData({ ...calcData, size: e.target.value })}
        >
          <option value="small">Маленький</option>
          <option value="medium">Средний</option>
          <option value="large">Большой</option>
        </select>
      </div>

      {/* Количество */}
      <div className="calc-group">
        <label>Количество</label>
        <input
          type="number"
          min="1"
          value={calcData.quantity}
          onChange={(e) => setCalcData({ ...calcData, quantity: e.target.value })}
        />
      </div>

      {/* Вес груза */}
      <div className="calc-group">
        <label>Вес груза (кг)</label>
        <input
          type="number"
          min="1"
          value={calcData.weight}
          onChange={(e) => setCalcData({ ...calcData, weight: e.target.value })}
        />
      </div>

      {/* Расстояние */}
      <div className="calc-group">
        <label>Расстояние (км)</label>
        <input
          type="number"
          min="1"
          value={calcData.distance}
          onChange={(e) => setCalcData({ ...calcData, distance: e.target.value })}
        />
      </div>

      {/* Скорость */}
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

      {/* Итоговая стоимость */}
      <div className="price-result">
        <h3>Стоимость доставки:</h3>
        <div className="price">{calculatePrice()} ₽</div>
      </div>
    </div>
  </div>
</section>

      <section className="reviews">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Отзывы клиентов</h2>
          <Swiper modules={[Navigation, Autoplay]} spaceBetween={30} loop={true} slidesPerView={1} navigation autoplay={{ delay: 3000 }} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }} data-aos="fade-up">
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="review-card">
                  <div className="review-header">
                    <div className="review-avatar">{review.name[0]}</div>
                    <div>
                      <h4>{review.name}</h4>
                      <div className="review-stars">{[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}</div>
                    </div>
                  </div>
                  <p className="review-text">"{review.text}"</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Свяжитесь с нами</h2>
          <form className="contact-form" onSubmit={handleSubmit} data-aos="zoom-in">
            <div className="form-group">
              <label>Ваше имя</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Телефон или Email</label>
              <input type="text" value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} required />
            </div>
            <div className="form-group">
              <label>Сообщение</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
            </div>
            <button type="submit" className="btn-submit">Отправить заявку</button>
          </form>
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
            <a href="tel:+79991234567"><FaPhone /> +7 (999) 123-45-67</a>
            <a href="mailto:info@fastdeliver.ru"><FaEnvelope /> info@fastdeliver.ru</a>
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

      <div>

        {/* Модальное окно */}
        {isOrderModalOpen && (
          <div className="modal-overlay" onClick={() => setIsOrderModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setIsOrderModalOpen(false)}>×</button>
              <h2 className="modal-title">Оформить заказ</h2>

              <div className="order-group">
                <label>Тип груза</label>
                <select
                  value={orderData.type}
                  onChange={(e) => setOrderData({ ...orderData, type: e.target.value })}
                >
                  <option value="documents">Документы</option>
                  <option value="parcels">Посылки</option>
                  <option value="cargo">Грузы</option>
                </select>
              </div>

              <div className="order-group">
                <label>Размер</label>
                <select
                  value={orderData.size}
                  onChange={(e) => setOrderData({ ...orderData, size: e.target.value })}
                >
                  <option value="small">Маленький</option>
                  <option value="medium">Средний</option>
                  <option value="large">Большой</option>
                </select>
              </div>

              <div className="order-group">
                <label>Количество</label>
                <input
                  type="number"
                  min="1"
                  value={orderData.quantity}
                  onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                />
              </div>

              {isOrderModalOpen && (
                <div className="modal-overlay" onClick={() => setIsOrderModalOpen(false)}>
                  <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                    <button className="modal-close" onClick={() => setIsOrderModalOpen(false)}>
                      ×
                    </button>

                    <h2 className="modal-title">Оформить заказ</h2>

                    {/* Тип груза */}
                    <div className="order-group">
                      <label>Тип груза</label>
                      <select
                        value={orderData.type}
                        onChange={(e) =>
                          setOrderData({ ...orderData, type: e.target.value })
                        }
                      >
                        <option value="documents">Документы</option>
                        <option value="parcels">Посылки</option>
                        <option value="cargo">Грузы</option>
                      </select>
                    </div>

                    {/* Размер */}
                    <div className="order-group">
                      <label>Размер</label>
                      <select
                        value={orderData.size}
                        onChange={(e) =>
                          setOrderData({ ...orderData, size: e.target.value })
                        }
                      >
                        <option value="small">Маленький</option>
                        <option value="medium">Средний</option>
                        <option value="large">Большой</option>
                      </select>
                    </div>

                    {/* Количество */}
                    <div className="order-group">
                      <label>Количество</label>
                      <input
                        type="number"
                        min="1"
                        value={orderData.quantity}
                        onChange={(e) =>
                          setOrderData({ ...orderData, quantity: e.target.value })
                        }
                      />
                    </div>

                     {/* Место принятия заказа */}
                    <div className="order-group">
                      <label>Место принятия заказа</label>
                      <input
                        type="text"
                        placeholder="Откуда забрать заказ"
                        value={orderData.pickup}
                        onChange={(e) =>
                          setOrderData({ ...orderData, pickup: e.target.value })
                        }
                      />
                    </div>

                    {/* Адрес доставки */}
                    <div className="order-group">
                      <label>Адрес доставки</label>
                      <input
                        type="text"
                        placeholder="Введите адрес доставки"
                        value={orderData.address}
                        onChange={(e) =>
                          setOrderData({ ...orderData, address: e.target.value })
                        }
                      />
                    </div>

                    <div className="order-total">
                      <h3>Итоговая стоимость</h3>
                      <div className="total-price">{calculateOrderPrice()} ₽</div>
                    </div>

                    <button className="btn-order" onClick={handleOrderSubmit}>
                      Перейти к оплате
                    </button>

                  </div>
                </div>
              )}

              <div className="order-group">
                <label>Адрес доставки</label>
                <input
                  type="text"
                  placeholder="Введите адрес доставки"
                  value={orderData.address}
                  onChange={(e) => setOrderData({ ...orderData, address: e.target.value })}
                />
              </div>

              <div className="order-total">
                <h3>Итоговая стоимость:</h3>
                <div className="total-price">{calculateOrderPrice()} ₽</div>
              </div>

              <button className="btn-order" onClick={handleOrderSubmit}>
                Перейти к оплате
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default CourierLanding;

