import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  Globe,
  Mail,
  MapPin,
  Phone,
  QrCode,
  Salad,
  Search,
  Soup,
  UserRound,
  Utensils,
} from 'lucide-react';
import './styles.css';

const preferenceOptions = ['Halal', 'Vegetarian'];
const allergyOptions = ['Peanuts', 'Tree Nuts', 'Seafood', 'Shellfish', 'Dairy', 'Eggs', 'Gluten', 'Soy'];
const foodTypeOptions = ['Seafood', 'Western', 'Korean', 'Japanese', 'Thai', 'Indian', 'Chinese', 'Vegetarian'];
const occasionOptions = ['Single', 'Date', 'Family'];
const priceLabels = ['$', '$$', '$$$', '$$$$'];

const heroFood = {
  name: 'Fresh restaurant meal',
  image: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1400&q=85',
};

const fakeRestaurants = [
  {
    id: 'seaside-sambal',
    name: 'Seaside Sambal Grill',
    foodType: 'Seafood',
    signatureDish: 'Chilli Lime Prawns',
    description: 'Bright seafood plates with rice, greens, and punchy sambal.',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=700&q=80',
    priceRange: 2,
    distance: 4,
    spiceLevel: 4,
    occasions: ['Single', 'Family'],
    preferences: ['Halal'],
    allergens: ['Seafood', 'Shellfish'],
    rating: 4.7,
  },
  {
    id: 'harbor-western',
    name: 'Harbor Western Kitchen',
    foodType: 'Western',
    signatureDish: 'Grilled Chicken Chop',
    description: 'Comfortable western mains, fast service, and generous sides.',
    image: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=700&q=80',
    priceRange: 2,
    distance: 6,
    spiceLevel: 1,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal'],
    allergens: ['Dairy', 'Gluten'],
    rating: 4.5,
  },
  {
    id: 'seoul-table',
    name: 'Seoul Table',
    foodType: 'Korean',
    signatureDish: 'Bibimbap Set',
    description: 'Colorful Korean bowls with adjustable gochujang heat.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80',
    priceRange: 3,
    distance: 9,
    spiceLevel: 3,
    occasions: ['Date', 'Family'],
    preferences: [],
    allergens: ['Soy', 'Eggs'],
    rating: 4.6,
  },
  {
    id: 'kumo-ramen',
    name: 'Kumo Ramen Bar',
    foodType: 'Japanese',
    signatureDish: 'Miso Mushroom Ramen',
    description: 'Quiet ramen counter with vegetarian broth and mellow spice.',
    image: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?auto=format&fit=crop&w=700&q=80',
    priceRange: 3,
    distance: 7,
    spiceLevel: 2,
    occasions: ['Single', 'Date'],
    preferences: ['Vegetarian'],
    allergens: ['Soy', 'Gluten'],
    rating: 4.8,
  },
  {
    id: 'mama-thai',
    name: 'Mama Thai Corner',
    foodType: 'Thai',
    signatureDish: 'Tom Yum Noodles',
    description: 'Sour-spicy bowls, quick tables, and big aroma.',
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?auto=format&fit=crop&w=700&q=80',
    priceRange: 2,
    distance: 5,
    spiceLevel: 5,
    occasions: ['Single', 'Family'],
    preferences: ['Halal'],
    allergens: ['Seafood', 'Shellfish'],
    rating: 4.7,
  },
  {
    id: 'ember-biryani',
    name: 'Ember Biryani House',
    foodType: 'Indian',
    signatureDish: 'Chicken Dum Biryani',
    description: 'Warm rice, deep spices, and family-friendly portions.',
    image: 'https://images.unsplash.com/photo-1631515242808-497c3fbd3972?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 8,
    spiceLevel: 4,
    occasions: ['Single', 'Family'],
    preferences: ['Halal'],
    allergens: ['Dairy'],
    rating: 4.5,
  },
  {
    id: 'jade-noodle',
    name: 'Jade Noodle House',
    foodType: 'Chinese',
    signatureDish: 'Wok Fried Hor Fun',
    description: 'Classic wok dishes with flexible portions for groups.',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80',
    priceRange: 2,
    distance: 11,
    spiceLevel: 1,
    occasions: ['Single', 'Family'],
    preferences: [],
    allergens: ['Soy', 'Gluten', 'Seafood'],
    rating: 4.3,
  },
  {
    id: 'green-lane',
    name: 'Green Lane Bowls',
    foodType: 'Vegetarian',
    signatureDish: 'Charred Broccoli Grain Bowl',
    description: 'Vegetarian bowls with clean sauces and allergy-aware prep.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
    priceRange: 2,
    distance: 3,
    spiceLevel: 1,
    occasions: ['Single', 'Date'],
    preferences: ['Vegetarian'],
    allergens: ['Tree Nuts'],
    rating: 4.6,
  },
  {
    id: 'garden-korean',
    name: 'Garden Seoul Veg',
    foodType: 'Korean',
    signatureDish: 'Vegetarian Japchae',
    description: 'A calmer Korean option with vegetarian plates and low heat.',
    image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=700&q=80',
    priceRange: 2,
    distance: 5,
    spiceLevel: 1,
    occasions: ['Date', 'Family'],
    preferences: ['Vegetarian'],
    allergens: ['Soy'],
    rating: 4.4,
  },
  {
    id: 'western-leaf',
    name: 'Western Leaf Cafe',
    foodType: 'Western',
    signatureDish: 'Vegetarian Mushroom Burger',
    description: 'Casual western comfort with vegetarian-friendly mains.',
    image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=700&q=80',
    priceRange: 2,
    distance: 4,
    spiceLevel: 0,
    occasions: ['Single', 'Date'],
    preferences: ['Vegetarian'],
    allergens: ['Dairy', 'Gluten'],
    rating: 4.2,
  },
  {
    id: 'seaweed-safe-seafood',
    name: 'Seaweed Bay Kitchen',
    foodType: 'Seafood',
    signatureDish: 'Ocean Herb Seaweed Bowl',
    description: 'Seafood-style flavors built from seaweed, citrus, rice, and vegetables.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 1,
    spiceLevel: 1,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal', 'Vegetarian'],
    allergens: [],
    rating: 4.1,
  },
  {
    id: 'sunny-western-safe',
    name: 'Sunny Western Plate',
    foodType: 'Western',
    signatureDish: 'Allergy-Safe Veggie Steak',
    description: 'A simple western plate with grilled vegetables and herb potatoes.',
    image: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 1,
    spiceLevel: 0,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal', 'Vegetarian'],
    allergens: [],
    rating: 4.0,
  },
  {
    id: 'seoul-safe-bowl',
    name: 'Seoul Safe Bowl',
    foodType: 'Korean',
    signatureDish: 'Mild Vegetable Rice Bowl',
    description: 'Korean-inspired rice bowl without common allergens or heavy spice.',
    image: 'https://images.unsplash.com/photo-1584278858536-52532423b9ea?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 1,
    spiceLevel: 1,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal', 'Vegetarian'],
    allergens: [],
    rating: 4.0,
  },
  {
    id: 'kyoto-safe-table',
    name: 'Kyoto Safe Table',
    foodType: 'Japanese',
    signatureDish: 'Cucumber Avocado Sushi Set',
    description: 'A light Japanese set with clean vegetable rolls and rice.',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 1,
    spiceLevel: 0,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal', 'Vegetarian'],
    allergens: [],
    rating: 4.2,
  },
  {
    id: 'thai-garden-safe',
    name: 'Thai Garden Safe',
    foodType: 'Thai',
    signatureDish: 'Mild Basil Vegetable Rice',
    description: 'Thai herbs and vegetables with adjustable heat and allergy-safe prep.',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 1,
    spiceLevel: 2,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal', 'Vegetarian'],
    allergens: [],
    rating: 4.1,
  },
  {
    id: 'indian-safe-thali',
    name: 'Indian Safe Thali',
    foodType: 'Indian',
    signatureDish: 'Gentle Vegetable Thali',
    description: 'A mild vegetable thali prepared without common allergy triggers.',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 1,
    spiceLevel: 2,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal', 'Vegetarian'],
    allergens: [],
    rating: 4.1,
  },
  {
    id: 'china-safe-wok',
    name: 'China Safe Wok',
    foodType: 'Chinese',
    signatureDish: 'Garlic Vegetable Rice',
    description: 'Simple wok vegetables and rice with a clean, allergen-light profile.',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 1,
    spiceLevel: 1,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal', 'Vegetarian'],
    allergens: [],
    rating: 4.0,
  },
  {
    id: 'pure-veg-safe',
    name: 'Pure Veg Safe House',
    foodType: 'Vegetarian',
    signatureDish: 'Rainbow Rice Plate',
    description: 'Vegetarian comfort plate designed for broad dietary compatibility.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=80',
    priceRange: 1,
    distance: 1,
    spiceLevel: 1,
    occasions: ['Single', 'Date', 'Family'],
    preferences: ['Halal', 'Vegetarian'],
    allergens: [],
    rating: 4.3,
  },
];

const emptyProfile = {
  name: '',
  eatingPreferences: [],
  spicyTolerance: 2,
  allergies: [],
};

const emptySurvey = {
  foodType: 'Western',
  diningOccasion: 'Single',
  priceRange: 2,
  maximumDistance: 8,
};

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState(emptyProfile);

  return (
    <main className="min-h-screen bg-[#F2E3C6] px-3 py-6 text-[#2C3E50] sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[980px] flex-col overflow-hidden rounded-[8px] border-[10px] border-white bg-[#F7B97A] shadow-2xl shadow-[#8f5b22]/25">
        <div className="bg-[#F2E3C6] px-5 pb-8 pt-7 sm:px-10">
          <FlyerHeader isRegistered={isRegistered} userProfile={userProfile} />
          <HeroFoodImage />
        </div>

        <div className="flex flex-1 flex-col gap-6 bg-[#F7B97A] px-5 py-7 sm:px-10">
          <section className="mx-auto w-full max-w-3xl">
            {isRegistered ? (
              <RestaurantSearchSurvey userProfile={userProfile} />
            ) : (
              <OnboardingWizard
                currentStep={currentStep}
                setCurrentStep={setCurrentStep}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                onComplete={() => setIsRegistered(true)}
              />
            )}
          </section>
          <FlyerFooter />
        </div>
      </section>
    </main>
  );
}

function FlyerHeader({ isRegistered, userProfile }) {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#2C3E50] bg-white text-[#E67E22] shadow-md">
        <Utensils size={30} />
      </div>
      <p className="brand-script text-6xl font-bold leading-none text-[#5D6B4E] sm:text-7xl">CraveLogic</p>
      <h1 className="mt-1 text-4xl font-black tracking-[0.18em] text-[#2C3E50] sm:text-6xl">
        FOOD CHOICER
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-justify text-sm font-semibold leading-6 text-[#2C3E50]/80 sm:text-base sm:leading-7">
        {isRegistered
          ? `Welcome ${userProfile.name || 'back'} - tell CraveLogic what today's meal should feel like, then find a restaurant that fits your appetite, occasion, price, and distance.`
          : 'Create a compact taste profile, set your preferences, and let CraveLogic prepare better restaurant recommendations every time you search.'}
      </p>
    </header>
  );
}

function HeroFoodImage() {
  return (
    <section className="mx-auto mt-7 max-w-3xl overflow-hidden rounded-[8px] border-4 border-white bg-white/40 p-2 shadow-lg">
      <img
        className="h-64 w-full rounded-[8px] object-cover sm:h-80"
        src={heroFood.image}
        alt={heroFood.name}
      />
    </section>
  );
}

function OnboardingWizard({ currentStep, setCurrentStep, userProfile, setUserProfile, onComplete }) {
  const totalSteps = 3;
  const canContinue = currentStep === 0 ? userProfile.name.trim().length > 0 : true;

  function toggleProfileList(field, value) {
    setUserProfile((profile) => ({
      ...profile,
      [field]: profile[field].includes(value)
        ? profile[field].filter((item) => item !== value)
        : [...profile[field], value],
    }));
  }

  function handleNext() {
    if (!canContinue) return;
    if (currentStep < totalSteps - 1) setCurrentStep((step) => step + 1);
    else onComplete();
  }

  return (
    <div className="rounded-[8px] border-4 border-white bg-[#fffaf0] p-4 shadow-xl sm:p-6">
      <PanelTitle eyebrow="Onboarding" title={`Step ${currentStep + 1} of ${totalSteps}`} />

      <div className="my-5 flex gap-2" aria-label="Onboarding progress">
        {[0, 1, 2].map((step) => (
          <span
            key={step}
            className={`h-2.5 flex-1 rounded-full transition-all duration-300 ${
              step <= currentStep ? 'bg-[#E67E22]' : 'bg-[#2C3E50]/15'
            }`}
          />
        ))}
      </div>

      <div className="step-transition" key={currentStep}>
        {currentStep === 0 && (
          <QuestionCard
            icon={UserRound}
            label="What is your name?"
            description="Saved to your taste profile for future searches."
          >
            <input
              autoFocus
              className="mt-5 w-full rounded-[8px] border-2 border-[#2C3E50]/15 bg-white px-4 py-4 text-lg font-bold outline-none transition focus:border-[#E67E22] focus:ring-4 focus:ring-[#E67E22]/20"
              placeholder="e.g. Alex"
              value={userProfile.name}
              onChange={(event) => setUserProfile({ ...userProfile, name: event.target.value })}
            />
          </QuestionCard>
        )}

        {currentStep === 1 && (
          <QuestionCard
            icon={Salad}
            label="Eating preferences?"
            description="Turn on every preference that should shape recommendations."
          >
            <div className="mt-5 grid gap-3">
              {preferenceOptions.map((preference) => (
                <SwitchOption
                  key={preference}
                  label={preference}
                  checked={userProfile.eatingPreferences.includes(preference)}
                  onChange={() => toggleProfileList('eatingPreferences', preference)}
                />
              ))}
              <div className="rounded-[8px] border-2 border-[#2C3E50]/15 bg-white px-4 py-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="font-black text-[#2C3E50]">Spicy Tolerance</span>
                  <span className="rounded-full bg-[#E67E22] px-3 py-1 text-sm font-black text-white">
                    {userProfile.spicyTolerance}/5
                  </span>
                </div>
                <input
                  className="w-full accent-[#E67E22]"
                  type="range"
                  min="0"
                  max="5"
                  value={userProfile.spicyTolerance}
                  onChange={(event) =>
                    setUserProfile({ ...userProfile, spicyTolerance: Number(event.target.value) })
                  }
                />
              </div>
            </div>
          </QuestionCard>
        )}

        {currentStep === 2 && (
          <QuestionCard
            icon={AlertTriangle}
            label="Any allergies?"
            description="Choose multiple allergies if they apply."
          >
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {allergyOptions.map((allergy) => (
                <SwitchOption
                  key={allergy}
                  label={allergy}
                  checked={userProfile.allergies.includes(allergy)}
                  onChange={() => toggleProfileList('allergies', allergy)}
                />
              ))}
            </div>
          </QuestionCard>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-[8px] px-4 font-black text-[#2C3E50] transition hover:bg-[#F2E3C6] disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
        >
          <ChevronLeft size={19} />
          Back
        </button>
        <button
          type="button"
          className="inline-flex min-h-12 items-center gap-2 rounded-[8px] bg-[#2C3E50] px-5 font-black text-white shadow-lg shadow-[#2C3E50]/20 transition hover:-translate-y-0.5 hover:bg-[#1f2d3a] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          disabled={!canContinue}
          onClick={handleNext}
        >
          {currentStep < totalSteps - 1 ? 'Next' : 'Finish onboarding'}
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
}

function RestaurantSearchSurvey({ userProfile }) {
  const [surveyResults, setSurveyResults] = useState(emptySurvey);
  const [restaurantMatches, setRestaurantMatches] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  function updateSurvey(field, value) {
    setSurveyResults((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      userProfile,
      surveyResults: {
        ...surveyResults,
        priceLabel: priceLabels[surveyResults.priceRange - 1],
      },
      submittedAt: new Date().toISOString(),
    };
    const matches = findRestaurants(userProfile, surveyResults);

    setRestaurantMatches(matches);
    setHasSearched(true);
    console.log('Restaurant search survey results:', payload);
    console.log('Restaurant matches:', matches);
  }

  return (
    <form className="rounded-[8px] border-4 border-white bg-[#fffaf0] p-4 shadow-xl sm:p-6" onSubmit={handleSubmit}>
      <PanelTitle eyebrow="Search survey" title={`Find today's menu, ${userProfile.name || 'friend'}`} />

      <div className="mt-5 grid gap-4">
        <QuestionCard icon={Search} label="What kind of food do you want to eat today?">
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {foodTypeOptions.map((foodType) => (
              <OptionButton
                key={foodType}
                label={foodType}
                selected={surveyResults.foodType === foodType}
                onClick={() => updateSurvey('foodType', foodType)}
              />
            ))}
          </div>
        </QuestionCard>

        <QuestionCard icon={Soup} label="Dining occasion?">
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {occasionOptions.map((occasion) => (
              <label
                key={occasion}
                className={`flex min-h-14 cursor-pointer items-center justify-center rounded-[8px] border-2 px-4 font-black transition ${
                  surveyResults.diningOccasion === occasion
                    ? 'border-[#E67E22] bg-[#F7B97A]/35 text-[#2C3E50] ring-4 ring-[#E67E22]/20'
                    : 'border-[#2C3E50]/15 bg-white text-[#2C3E50]/75 hover:border-[#E67E22]/50'
                }`}
              >
                <input
                  className="sr-only"
                  type="radio"
                  name="diningOccasion"
                  value={occasion}
                  checked={surveyResults.diningOccasion === occasion}
                  onChange={(event) => updateSurvey('diningOccasion', event.target.value)}
                />
                {occasion}
              </label>
            ))}
          </div>
        </QuestionCard>

        <div className="grid gap-4 md:grid-cols-2">
          <QuestionCard icon={Utensils} label="Price range?">
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-black text-[#2C3E50]/65">Budget</span>
                <span className="rounded-full bg-[#E67E22] px-3 py-1 text-sm font-black text-white">
                  {priceLabels[surveyResults.priceRange - 1]}
                </span>
              </div>
              <input
                className="w-full accent-[#E67E22]"
                type="range"
                min="1"
                max="4"
                value={surveyResults.priceRange}
                onChange={(event) => updateSurvey('priceRange', Number(event.target.value))}
              />
              <div className="mt-2 flex justify-between text-xs font-black text-[#2C3E50]/50">
                {priceLabels.map((label) => (
                  <span key={label}>{label}</span>
                ))}
              </div>
            </div>
          </QuestionCard>

          <QuestionCard icon={MapPin} label="Maximum distance?">
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-black text-[#2C3E50]/65">Distance</span>
                <span className="rounded-full bg-[#E67E22] px-3 py-1 text-sm font-black text-white">
                  {surveyResults.maximumDistance} km
                </span>
              </div>
              <input
                className="w-full accent-[#E67E22]"
                type="range"
                min="1"
                max="25"
                value={surveyResults.maximumDistance}
                onChange={(event) => updateSurvey('maximumDistance', Number(event.target.value))}
              />
            </div>
          </QuestionCard>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-[8px] bg-[#2C3E50] px-5 text-lg font-black text-white shadow-xl shadow-[#2C3E50]/25 transition hover:-translate-y-0.5 hover:bg-[#1f2d3a]"
      >
        <Search size={21} />
        Find Restaurants
      </button>

      {hasSearched && (
        <section className="mt-6 rounded-[8px] border-2 border-[#2C3E50]/10 bg-white p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E67E22]">Best matches</p>
              <h3 className="text-xl font-black text-[#2C3E50]">
                {restaurantMatches.length ? 'Recommended restaurants' : 'No clean match found'}
              </h3>
            </div>
            <span className="rounded-full bg-[#E67E22] px-3 py-1 text-sm font-black text-white">
              {restaurantMatches.length}
            </span>
          </div>

          {restaurantMatches.length ? (
            <div className="grid gap-3">
              {restaurantMatches.map((restaurant, index) => (
                <RestaurantResultCard key={restaurant.id} restaurant={restaurant} rank={index + 1} />
              ))}
            </div>
          ) : (
            <p className="text-sm font-semibold leading-6 text-[#2C3E50]/70">
              Try increasing distance, budget, or choosing fewer allergy restrictions.
            </p>
          )}
        </section>
      )}
    </form>
  );
}

function findRestaurants(userProfile, surveyResults) {
  return fakeRestaurants
    .filter((restaurant) => restaurant.foodType === surveyResults.foodType)
    .filter((restaurant) => restaurant.distance <= surveyResults.maximumDistance)
    .filter((restaurant) => !userProfile.allergies.some((allergy) => restaurant.allergens.includes(allergy)))
    .filter((restaurant) =>
      userProfile.eatingPreferences.every((preference) => restaurant.preferences.includes(preference)),
    )
    .map((restaurant) => {
      const reasons = [];
      let score = restaurant.rating * 10;

      score += restaurant.occasions.includes(surveyResults.diningOccasion) ? 18 : 0;
      if (restaurant.occasions.includes(surveyResults.diningOccasion)) {
        reasons.push(`works for ${surveyResults.diningOccasion.toLowerCase()} dining`);
      }

      const budgetGap = surveyResults.priceRange - restaurant.priceRange;
      if (budgetGap >= 0) {
        score += 16 - budgetGap * 2;
        reasons.push(`${priceLabels[restaurant.priceRange - 1]} fits your budget`);
      } else {
        score += budgetGap * 10;
      }

      const spiceGap = Math.abs(userProfile.spicyTolerance - restaurant.spiceLevel);
      score += Math.max(0, 14 - spiceGap * 4);
      reasons.push(`spice level ${restaurant.spiceLevel}/5`);

      score += Math.max(0, 12 - restaurant.distance);
      if (userProfile.eatingPreferences.length) {
        reasons.push(`matches ${userProfile.eatingPreferences.join(' and ')}`);
      }
      if (userProfile.allergies.length) {
        reasons.push('avoids your selected allergies');
      }

      return {
        ...restaurant,
        score,
        reasons,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function RestaurantResultCard({ restaurant, rank }) {
  return (
    <article className="overflow-hidden rounded-[8px] border-2 border-[#2C3E50]/10 bg-[#fffaf0]">
      <img className="h-36 w-full object-cover" src={restaurant.image} alt={restaurant.name} />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#E67E22]">Pick #{rank}</p>
            <h4 className="mt-1 text-lg font-black text-[#2C3E50]">{restaurant.name}</h4>
            <p className="mt-1 text-sm font-bold text-[#2C3E50]/70">{restaurant.signatureDish}</p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E67E22] text-sm font-black text-white">
            {Math.round(restaurant.score)}%
          </div>
        </div>

        <p className="mt-3 text-sm font-semibold leading-6 text-[#2C3E50]/75">{restaurant.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          <ResultPill label={restaurant.foodType} />
          <ResultPill label={priceLabels[restaurant.priceRange - 1]} />
          <ResultPill label={`${restaurant.distance} km`} />
          <ResultPill label={`${restaurant.spiceLevel}/5 spicy`} />
          <ResultPill label={`${restaurant.rating} rating`} />
        </div>

        <p className="mt-3 text-sm font-bold leading-6 text-[#2C3E50]">
          Why: {restaurant.reasons.slice(0, 3).join(', ')}.
        </p>
      </div>
    </article>
  );
}

function ResultPill({ label }) {
  return (
    <span className="rounded-full bg-[#F2E3C6] px-3 py-1 text-xs font-black text-[#2C3E50]">
      {label}
    </span>
  );
}

function PanelTitle({ eyebrow, title }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#E67E22]">{eyebrow}</p>
      <h2 className="mt-1 text-2xl font-black leading-tight text-[#2C3E50]">{title}</h2>
    </div>
  );
}

function QuestionCard({ icon: Icon, label, description, children }) {
  return (
    <section className="rounded-[8px] border-2 border-[#2C3E50]/10 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-[#F2E3C6] text-[#E67E22]">
          <Icon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-black text-[#2C3E50]">{label}</h3>
          {description && <p className="mt-1 text-sm font-semibold leading-6 text-[#2C3E50]/65">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

function SwitchOption({ label, checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`flex min-h-14 items-center justify-between gap-4 rounded-[8px] border-2 px-4 py-3 text-left font-black transition ${
        checked
          ? 'border-[#E67E22] bg-[#F7B97A]/35 text-[#2C3E50] ring-4 ring-[#E67E22]/20'
          : 'border-[#2C3E50]/15 bg-white text-[#2C3E50]/75 hover:border-[#E67E22]/50'
      }`}
      onClick={onChange}
    >
      <span>{label}</span>
      <span
        className={`relative h-7 w-12 shrink-0 rounded-full p-1 transition ${
          checked ? 'bg-[#E67E22]' : 'bg-[#2C3E50]/20'
        }`}
      >
        <span
          className={`block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
}

function OptionButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      className={`min-h-14 rounded-[8px] border-2 px-4 text-left font-black transition ${
        selected
          ? 'border-[#E67E22] bg-[#F7B97A]/35 text-[#2C3E50] ring-4 ring-[#E67E22]/20'
          : 'border-[#2C3E50]/15 bg-white text-[#2C3E50]/75 hover:border-[#E67E22]/50'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function FlyerFooter() {
  return (
    <footer className="flex flex-col gap-4 rounded-[8px] border-4 border-white bg-[#fffaf0] p-4 text-[#2C3E50] shadow-xl md:flex-row md:items-center md:justify-between">
      <div className="grid gap-2 text-sm font-bold leading-6">
        <p className="flex items-center gap-2">
          <Phone size={17} className="text-[#E67E22]" />
          +60 12-345 6789
        </p>
        <p className="flex items-center gap-2">
          <Mail size={17} className="text-[#E67E22]" />
          hello@cravelogic.menu
        </p>
      </div>

      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[8px] border-2 border-[#2C3E50] bg-white">
        <QrCode size={54} />
      </div>

      <div className="grid gap-2 text-sm font-bold leading-6 md:text-right">
        <p className="flex items-center gap-2 md:justify-end">
          <MapPin size={17} className="text-[#E67E22]" />
          18 Menu Street, Kuala Lumpur
        </p>
        <p className="flex items-center gap-2 md:justify-end">
          <Globe size={17} className="text-[#E67E22]" />
          www.cravelogic.menu
        </p>
      </div>
    </footer>
  );
}

createRoot(document.getElementById('root')).render(<App />);
