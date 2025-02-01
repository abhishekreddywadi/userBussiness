import React from "react";
import { Link } from "react-router-dom";
import "./masterStaff.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const MasterStaff = () => {
  const events = [
    {
      id: 1,
      name: "Gym Access",
      price: 1499,
      duration: "Monthly",
      features: [
        "Full gym access",
        "Basic equipment usage",
        "Locker access",
        "Shower facility"
      ],
      description: "Basic gym membership with access to all equipment",
      discount: 10
    },
    {
      id: 2,
      name: "Premium Fitness",
      price: 2499,
      duration: "Monthly",
      features: [
        "Full gym access",
        "All equipment usage",
        "Personal trainer (2 sessions)",
        "Nutrition consultation",
        "Locker access",
        "Shower facility",
        "Towel service"
      ],
      description: "Premium membership with additional benefits and personal training",
      discount: 15
    },
    {
      id: 3,
      name: "Elite Training",
      price: 3999,
      duration: "Monthly",
      features: [
        "24/7 gym access",
        "All equipment usage",
        "Personal trainer (4 sessions)",
        "Nutrition planning",
        "Supplement guidance",
        "Premium locker",
        "Spa access",
        "Massage (1 session)"
      ],
      description: "Elite membership for serious fitness enthusiasts",
      discount: 20
    }
  ];

  const calculateDiscountedPrice = (price, discount) => {
    const discountAmount = (price * discount) / 100;
    return price - discountAmount;
  };

  return (
    <div className="master-staff mt-4">
      <div className="staff-list">
        <div className="row g-3">
          {events.map((event) => (
            <div key={event.id} className="col-12 col-md-6 col-lg-4">
              <div className="event-card" style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '1rem',
                height: '100%',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div className="card-header" style={{
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '0.75rem',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.25rem'
                  }}>{event.name}</h3>
                
                  <div style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <h4 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        margin: 0
                      }}>₹{calculateDiscountedPrice(event.price, event.discount)}</h4>
                      {event.discount > 0 && (
                        <span style={{
                          fontSize: '0.75rem',
                          color: '#ef4444',
                          textDecoration: 'line-through'
                        }}>₹{event.price}</span>
                      )}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <span>Duration:</span>
                      <span>{event.duration}</span>
                    </div>
                    {event.discount > 0 && (
                      <div style={{
                        fontSize: '0.75rem',
                        color: '#22c55e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}>
                        <span>Save:</span>
                        <span>{event.discount}% OFF</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-body" style={{ flex: 1 }}>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}>
                    {event.features.map((feature, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.25rem',
                        fontSize: '0.75rem',
                        color: '#475569',
                        lineHeight: '1.3'
                      }}>
                        <FontAwesomeIcon icon={faCheck} style={{ 
                          color: '#22c55e',
                          marginTop: '0.1rem',
                          fontSize: '0.75rem'
                        }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer" style={{
                  marginTop: '1rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid #e2e8f0'
                }}>
                  <button style={{
                    width: '100%',
                    padding: '0.5rem',
                    backgroundColor: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}>
                    Select Plan
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterStaff;
