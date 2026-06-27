import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Beef,
  Bike,
  BriefcaseBusiness,
  CalendarHeart,
  Check,
  ChevronRight,
  Clock3,
  Flame,
  Heart,
  Leaf,
  LocateFixed,
  MapPin,
  RefreshCw,
  Salad,
  Sparkles,
  Star,
  Users,
  Utensils,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import './styles.css';

const restaurants = [
  {
    id: 'mama-thai',
    name: 'Mama Thai Corner',
    cuisine: 'Thai',
    dish: 'Tom Yum Glass Noodles',
    price: 2,
    distance: 5,
    eta: 8,
    rating: 4.8,
    spice: 4,
    vibe: ['comfort', 'adventurous', 'fast'],
    social: ['solo', 'family', 'date'],
    tags: ['halal', 'seafood'],
    avoid: ['nuts'],
    open: true,
    photo:
      'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=900&q=80',
    highlight: 'steamy, sour-spicy broth that still lands fast',
  },
  {
    id: 'green-lane',
    name: 'Green Lane Bowls',
    cuisine: 'Vegetarian',
    dish: 'Charred Broccoli Grain Bowl',
    price: 2,
    distance: 9,
    eta: 14,
    rating: 4.6,
    spice: 1,
    vibe: ['healthy', 'fast'],
    social: ['solo', 'business'],
    tags: ['vegetarian', 'vegan', 'gluten-free'],
    avoid: ['seafood'],
    open: true,
    photo:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    highlight: 'clean fuel with enough texture to feel satisfying',
  },
  {
    id: 'ember-biryani',
    name: 'Ember Biryani House',
    cuisine: 'Indian',
    dish: 'Chicken Dum Biryani',
    price: 1,
    distance: 11,
    eta: 17,
    rating: 4.7,
    spice: 3,
    vibe: ['comfort', 'adventurous'],
    social: ['solo', 'family', 'business'],
    tags: ['halal'],
    avoid: ['gluten'],
    open: true,
    photo:
      'https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=900&q=80',
    highlight: 'warm, filling, budget-friendly, and easy to share',
  },
  {
    id: 'kumo-ramen',
    name: 'Kumo Ramen Bar',
    cuisine: 'Japanese',
    dish: 'Miso Mushroom Ramen',
    price: 3,
    distance: 7,
    eta: 12,
    rating: 4.5,
    spice: 2,
    vibe: ['comfort', 'date'],
    social: ['solo', 'date'],
    tags: ['vegetarian'],
    avoid: ['seafood', 'nuts'],
    open: true,
    photo:
      'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=900&q=80',
    highlight: 'quiet counter seating and a mellow broth profile',
  },
  {
    id: 'mesa-taco',
    name: 'Mesa Taco Lab',
    cuisine: 'Mexican',
    dish: 'Citrus Carnitas Tacos',
    price: 2,
    distance: 6,
    eta: 10,
    rating: 4.4,
    spice: 3,
    vibe: ['adventurous', 'fast'],
    social: ['solo', 'date', 'family'],
    tags: ['gluten-free'],
    avoid: ['nuts', 'seafood'],
    open: true,
    photo:
      'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=900&q=80',
    highlight: 'bright flavors, quick counter service, low commitment',
  },
  {
    id: 'harbor-pasta',
    name: 'Harbor Pasta Studio',
    cuisine: 'Italian',
    dish: 'Lemon Ricotta Tagliatelle',
    price: 3,
    distance: 13,
    eta: 19,
    rating: 4.7,
    spice: 0,
    vibe: ['comfort', 'date', 'business'],
    social: ['date', 'business', 'family'],
    tags: ['vegetarian'],
    avoid: ['seafood', 'nuts'],
    open: true,
    photo:
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=900&q=80',
    highlight: 'polished enough for company without feeling fussy',
  },
];

const moodOptions = [
  { id: 'comfort', label: 'Comfort', icon: Heart },
  { id: 'adventurous', label: 'Adventurous', icon: Sparkles },
  { id: 'healthy', label: 'Healthy', icon: Salad },
  { id: 'fast', label: 'Fast', icon: Zap },
];

const socialOptions = [
  { id: 'solo', label: 'Solo', icon: Utensils },
  { id: 'family', label: 'Family', icon: Users },
  { id: 'date', label: 'Date', icon: CalendarHeart },
  { id: 'business', label: 'Meeting', icon: BriefcaseBusiness },
];

const constraintOptions = [
  { id: 'halal', label: 'Halal', icon: BadgeCheck },
  { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
  { id: 'vegan', label: 'Vegan', icon: Leaf },
  { id: 'nuts', label: 'No nuts', icon: AlertTriangle, allergy: true },
  { id: 'seafood', label: 'No seafood', icon: Beef, allergy: true },
  { id: 'gluten', label: 'No gluten', icon: AlertTriangle, allergy: true },
];

const cuisineOptions = ['Thai', 'Indian', 'Japanese', 'Mexican', 'Italian', 'Vegetarian'];

const initialProfile = {
  constraints: ['halal', 'nuts'],
  cuisines: ['Thai', 'Indian', 'Japanese'],
  spice: 3,
  budget: 2,
  travel: 15,
};

const initialContext = {
  mood: 'comfort',
  social: 'solo',
  urgency: 2,
};

function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [context, setContext] = useState(initialContext);
  const [spin, setSpin] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const recommendation = useMemo(
    () => rankRestaurants(profile, context, feedback, spin),
    [profile, context, feedback, spin],
  );

  const decisionSeconds = 38 - Math.min(spin * 4 + feedback.length * 2, 18);

  function toggleList(key, value) {
    setConfirmed(false);
    setProfile((current) => {
      const exists = current[key].includes(value);
      return {
        ...current,
        [key]: exists
          ? current[key].filter((item) => item !== value)
          : [...current[key], value],
      };
    });
  }

  function rate(type) {
    setFeedback((items) => [{ id: recommendation.id, type }, ...items].slice(0, 8));
    if (type !== 'hit') setSpin((value) => value + 1);
    if (type === 'hit') setConfirmed(true);
  }

  return (
    <main className="app-shell">
      <section className="topbar" aria-label="CraveLogic status">
        <div>
          <p className="eyebrow">CraveLogic</p>
          <h1>One confident food decision.</h1>
        </div>
        <div className="status-strip">
          <Metric icon={Clock3} label="Decision" value={`${decisionSeconds}s`} />
          <Metric icon={LocateFixed} label="Radius" value={`${profile.travel} min`} />
          <Metric icon={Star} label="Fit" value={`${recommendation.fit}%`} />
        </div>
      </section>

      <section className="workspace">
        <aside className="panel profile-panel" aria-label="Taste fingerprint">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Taste fingerprint</p>
              <h2>Guardrails</h2>
            </div>
            <span className="pill">Live profile</span>
          </div>

          <ControlGroup label="Diet and allergies">
            <div className="chip-grid">
              {constraintOptions.map((item) => (
                <Chip
                  key={item.id}
                  active={profile.constraints.includes(item.id)}
                  icon={item.icon}
                  label={item.label}
                  tone={item.allergy ? 'warning' : 'positive'}
                  onClick={() => toggleList('constraints', item.id)}
                />
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label="Cuisine gravity">
            <div className="cuisine-grid">
              {cuisineOptions.map((cuisine) => (
                <button
                  className={profile.cuisines.includes(cuisine) ? 'cuisine active' : 'cuisine'}
                  key={cuisine}
                  onClick={() => toggleList('cuisines', cuisine)}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </ControlGroup>

          <Slider
            icon={Flame}
            label="Spice tolerance"
            min={0}
            max={4}
            value={profile.spice}
            suffix="/4"
            onChange={(value) => setProfile({ ...profile, spice: value })}
          />

          <Slider
            icon={Wallet}
            label="Budget tier"
            min={1}
            max={4}
            value={profile.budget}
            prefix={'$'.repeat(profile.budget)}
            onChange={(value) => setProfile({ ...profile, budget: value })}
          />
        </aside>

        <section className="decision-stage" aria-label="Recommendation">
          <div className="hero-card">
            <img src={recommendation.photo} alt={`${recommendation.dish} at ${recommendation.name}`} />
            <div className="hero-overlay">
              <div className="fit-badge">
                <Sparkles size={16} />
                {recommendation.fit}% best fit
              </div>
              <button
                className="icon-button"
                aria-label="Spin again"
                title="Spin again"
                onClick={() => {
                  setConfirmed(false);
                  setSpin((value) => value + 1);
                }}
              >
                <RefreshCw size={20} />
              </button>
            </div>
          </div>

          <div className="recommendation">
            <div>
              <p className="eyebrow">Best fit right now</p>
              <h2>{recommendation.name}</h2>
              <p className="dish">{recommendation.dish}</p>
            </div>
            <div className="quick-facts" aria-label="Restaurant facts">
              <Fact icon={MapPin} text={`${recommendation.distance} min away`} />
              <Fact icon={Bike} text={`${recommendation.eta} min delivery`} />
              <Fact icon={Wallet} text={'$'.repeat(recommendation.price)} />
              <Fact icon={Flame} text={`${recommendation.spice}/4 spice`} />
            </div>
            <div className="why">
              <h3>Why this fits you</h3>
              <p>{recommendation.reason}</p>
            </div>
            <div className="actions">
              <button className="primary-action" onClick={() => rate('hit')}>
                <Check size={19} />
                Confirm
              </button>
              <button className="secondary-action" onClick={() => rate('maybe')}>
                <ChevronRight size={19} />
                Maybe
              </button>
              <button className="secondary-action" onClick={() => rate('miss')}>
                <X size={19} />
                Miss
              </button>
            </div>
            {confirmed && (
              <div className="confirmed">
                <BadgeCheck size={18} />
                Confirmed. This interaction is ready to log to Supabase.
              </div>
            )}
          </div>
        </section>

        <aside className="panel context-panel" aria-label="Situation dashboard">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Situation dashboard</p>
              <h2>Current context</h2>
            </div>
            <span className="pill">Open now</span>
          </div>

          <ControlGroup label="Mood">
            <Segmented options={moodOptions} value={context.mood} onChange={(mood) => setContext({ ...context, mood })} />
          </ControlGroup>

          <ControlGroup label="Social setting">
            <Segmented
              options={socialOptions}
              value={context.social}
              onChange={(social) => setContext({ ...context, social })}
            />
          </ControlGroup>

          <Slider
            icon={Clock3}
            label="Urgency"
            min={1}
            max={4}
            value={context.urgency}
            suffix="/4"
            onChange={(urgency) => setContext({ ...context, urgency })}
          />

          <Slider
            icon={LocateFixed}
            label="Travel tolerance"
            min={5}
            max={25}
            value={profile.travel}
            suffix=" min"
            onChange={(travel) => setProfile({ ...profile, travel })}
          />

          <div className="learning-log">
            <div className="learning-title">
              <RefreshCw size={17} />
              Feedback loop
            </div>
            {feedback.length === 0 ? (
              <p>Ratings will tune the next spin.</p>
            ) : (
              feedback.slice(0, 3).map((item, index) => (
                <p key={`${item.id}-${index}`}>
                  {item.type} registered for {restaurants.find((r) => r.id === item.id)?.name}
                </p>
              ))
            )}
          </div>
        </aside>
      </section>
    </main>
  );
}

function rankRestaurants(profile, context, feedback, spin) {
  const disliked = new Set(feedback.filter((item) => item.type === 'miss').map((item) => item.id));
  const maybe = new Set(feedback.filter((item) => item.type === 'maybe').map((item) => item.id));

  const scored = restaurants
    .filter((restaurant) => restaurant.open)
    .map((restaurant) => {
      let score = 45;
      const reasons = [];

      const hardConstraintsPass = profile.constraints.every((constraint) => {
        const isAllergy = ['nuts', 'seafood', 'gluten'].includes(constraint);
        return isAllergy ? !restaurant.avoid.includes(constraint) : restaurant.tags.includes(constraint);
      });

      if (!hardConstraintsPass) score -= 35;
      else reasons.push('matches your dietary guardrails');

      if (profile.cuisines.includes(restaurant.cuisine)) {
        score += 16;
        reasons.push(`${restaurant.cuisine} is in your cuisine fingerprint`);
      }

      const spiceGap = Math.abs(profile.spice - restaurant.spice);
      score += Math.max(0, 12 - spiceGap * 4);

      if (restaurant.vibe.includes(context.mood)) {
        score += 15;
        reasons.push(`fits a ${context.mood} mood`);
      }

      if (restaurant.social.includes(context.social)) {
        score += 9;
        reasons.push(`works for ${context.social === 'business' ? 'a meeting' : context.social}`);
      }

      if (restaurant.price <= profile.budget) score += 8;
      else score -= (restaurant.price - profile.budget) * 7;

      if (restaurant.distance <= profile.travel) score += 10;
      else score -= 18;

      if (context.urgency >= 3) score += Math.max(0, 14 - restaurant.eta);
      if (disliked.has(restaurant.id)) score -= 28;
      if (maybe.has(restaurant.id)) score -= 9;

      score += restaurant.rating * 2;
      score += ((spin + restaurant.id.length) % 5) * 2;

      return {
        ...restaurant,
        score,
        fit: Math.max(62, Math.min(98, Math.round(score))),
        reason: buildReason(restaurant, reasons, context),
      };
    })
    .sort((a, b) => b.score - a.score);

  return scored[spin % Math.min(scored.length, 3)] || scored[0];
}

function buildReason(restaurant, reasons, context) {
  const lead = reasons.slice(0, 2).join(', ');
  const timeHint = context.urgency >= 3 ? 'and it is fast enough for the clock you are on' : 'without making dinner feel like a project';
  return `${lead ? `${capitalize(lead)}, ` : ''}${restaurant.highlight}, ${timeHint}.`;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="metric">
      <Icon size={17} />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ControlGroup({ label, children }) {
  return (
    <div className="control-group">
      <label>{label}</label>
      {children}
    </div>
  );
}

function Chip({ active, icon: Icon, label, onClick, tone }) {
  return (
    <button className={`chip ${active ? 'active' : ''} ${tone}`} onClick={onClick}>
      <Icon size={16} />
      <span>{label}</span>
    </button>
  );
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="segmented">
      {options.map(({ id, label, icon: Icon }) => (
        <button key={id} className={value === id ? 'active' : ''} onClick={() => onChange(id)}>
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}

function Slider({ icon: Icon, label, min, max, value, onChange, prefix = '', suffix = '' }) {
  return (
    <div className="slider-row">
      <div className="slider-label">
        <span>
          <Icon size={17} />
          {label}
        </span>
        <strong>{prefix || `${value}${suffix}`}</strong>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function Fact({ icon: Icon, text }) {
  return (
    <span className="fact">
      <Icon size={16} />
      {text}
    </span>
  );
}

createRoot(document.getElementById('root')).render(<App />);
