import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  HeartHandshake,
  MapPin,
  Salad,
  Search,
  Sparkles,
  UserRound,
  Utensils,
} from 'lucide-react';
import './styles.css';

const preferenceOptions = ['Halal', 'Vegetarian', 'Spicy Tolerance', 'Allergies'];
const occasionOptions = ['Single', 'Date', 'Family'];
const priceOptions = ['$', '$$', '$$$'];

const emptyProfile = {
  name: '',
  eatingPreferences: [],
};

const emptySurvey = {
  foodCraving: '',
  diningOccasion: 'Single',
  priceRange: '$$',
  maximumDistance: 8,
};

function App() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState(emptyProfile);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-950">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.22),_transparent_34rem),linear-gradient(135deg,_#f8fafc_0%,_#ecfeff_48%,_#fff7ed_100%)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col">
          <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-emerald-700 shadow-sm ring-1 ring-slate-200">
                <Sparkles size={16} />
                CraveLogic
              </p>
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Food decisions, without the scroll spiral.
              </h1>
            </div>
            <div className="rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-slate-200 backdrop-blur">
              <p className="text-sm font-semibold text-slate-500">Status</p>
              <p className="mt-1 text-lg font-black text-slate-900">
                {isRegistered ? `Ready for ${userProfile.name || 'you'}` : 'Onboarding'}
              </p>
            </div>
          </header>

          <section className="grid flex-1 items-center gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <IntroPanel isRegistered={isRegistered} userProfile={userProfile} />
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
        </div>
      </div>
    </main>
  );
}

function IntroPanel({ isRegistered, userProfile }) {
  return (
    <aside className="rounded-3xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/60 sm:p-8">
      <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400 text-slate-950">
        {isRegistered ? <Search size={28} /> : <UserRound size={28} />}
      </div>
      <h2 className="mb-4 text-3xl font-black tracking-tight">
        {isRegistered ? 'Tell us what today needs.' : 'Build your taste profile first.'}
      </h2>
      <p className="text-lg leading-8 text-slate-300">
        {isRegistered
          ? 'The search survey captures the changing context: craving, occasion, budget, and distance.'
          : 'Two quick onboarding steps give the recommendation system enough signal to personalize future searches.'}
      </p>

      <div className="mt-8 grid gap-3">
        <Signal icon={HeartHandshake} label="Profile" value={userProfile.name || 'Not set yet'} />
        <Signal
          icon={Salad}
          label="Preferences"
          value={userProfile.eatingPreferences.length ? userProfile.eatingPreferences.join(', ') : 'Pending'}
        />
        <Signal icon={MapPin} label="Flow" value={isRegistered ? 'Restaurant survey' : 'Wizard steps'} />
      </div>
    </aside>
  );
}

function Signal({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
      <Icon className="shrink-0 text-emerald-300" size={21} />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
        <p className="truncate font-bold text-white">{value}</p>
      </div>
    </div>
  );
}

function OnboardingWizard({ currentStep, setCurrentStep, userProfile, setUserProfile, onComplete }) {
  const canContinue =
    currentStep === 0 ? userProfile.name.trim().length > 0 : userProfile.eatingPreferences.length > 0;

  function togglePreference(preference) {
    setUserProfile((profile) => ({
      ...profile,
      eatingPreferences: profile.eatingPreferences.includes(preference)
        ? profile.eatingPreferences.filter((item) => item !== preference)
        : [...profile.eatingPreferences, preference],
    }));
  }

  function handleNext() {
    if (!canContinue) return;
    if (currentStep === 0) setCurrentStep(1);
    else onComplete();
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-5 shadow-2xl shadow-slate-300/50 ring-1 ring-slate-200 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase text-emerald-700">Onboarding</p>
          <h2 className="text-2xl font-black text-slate-950">Step {currentStep + 1} of 2</h2>
        </div>
        <div className="flex gap-2" aria-label="Onboarding progress">
          {[0, 1].map((step) => (
            <span
              key={step}
              className={`h-2.5 w-10 rounded-full transition-all duration-300 ${
                step <= currentStep ? 'bg-emerald-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="step-transition" key={currentStep}>
        {currentStep === 0 ? (
          <QuestionCard
            icon={UserRound}
            label="What is your name?"
            description="This is saved in the userProfile object for future recommendation requests."
          >
            <input
              autoFocus
              className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-lg font-semibold outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              placeholder="e.g. Alex"
              value={userProfile.name}
              onChange={(event) => setUserProfile({ ...userProfile, name: event.target.value })}
            />
          </QuestionCard>
        ) : (
          <QuestionCard
            icon={Utensils}
            label="Eating preferences?"
            description="Choose every option that should shape restaurant recommendations."
          >
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {preferenceOptions.map((preference) => {
                const selected = userProfile.eatingPreferences.includes(preference);
                return (
                  <button
                    key={preference}
                    type="button"
                    className={`flex min-h-16 items-center justify-between rounded-2xl border px-4 py-3 text-left font-bold transition ${
                      selected
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-4 ring-emerald-100'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-white'
                    }`}
                    onClick={() => togglePreference(preference)}
                  >
                    {preference}
                    {selected && <Check size={19} />}
                  </button>
                );
              })}
            </div>
          </QuestionCard>
        )}
      </div>

      <div className="mt-7 flex items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex min-h-11 items-center gap-2 rounded-2xl px-4 font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(0)}
        >
          <ChevronLeft size={19} />
          Back
        </button>
        <button
          type="button"
          className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-slate-950 px-5 font-black text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          disabled={!canContinue}
          onClick={handleNext}
        >
          {currentStep === 0 ? 'Next' : 'Finish onboarding'}
          <ArrowRight size={19} />
        </button>
      </div>
    </div>
  );
}

function RestaurantSearchSurvey({ userProfile }) {
  const [surveyResults, setSurveyResults] = useState(emptySurvey);

  function updateSurvey(field, value) {
    setSurveyResults((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      userProfile,
      surveyResults,
      submittedAt: new Date().toISOString(),
    };

    console.log('Restaurant search survey results:', payload);
  }

  return (
    <form
      className="rounded-3xl bg-white p-5 shadow-2xl shadow-slate-300/50 ring-1 ring-slate-200 sm:p-8"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <p className="text-sm font-bold uppercase text-emerald-700">Restaurant search survey</p>
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          What should we find today, {userProfile.name || 'friend'}?
        </h2>
      </div>

      <div className="grid gap-4">
        <QuestionCard icon={Search} label="What kind of food do you want to eat today?">
          <input
            className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-lg font-semibold outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            placeholder="e.g. ramen, tacos, nasi lemak"
            value={surveyResults.foodCraving}
            onChange={(event) => updateSurvey('foodCraving', event.target.value)}
          />
        </QuestionCard>

        <QuestionCard icon={HeartHandshake} label="Dining occasion?">
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {occasionOptions.map((occasion) => (
              <label
                key={occasion}
                className={`flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border px-4 font-bold transition ${
                  surveyResults.diningOccasion === occasion
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-4 ring-emerald-100'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-white'
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
            <select
              className="mt-5 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-lg font-black outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
              value={surveyResults.priceRange}
              onChange={(event) => updateSurvey('priceRange', event.target.value)}
            >
              {priceOptions.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </QuestionCard>

          <QuestionCard icon={MapPin} label="Maximum distance?">
            <div className="mt-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-500">Distance</span>
                <span className="rounded-full bg-slate-950 px-3 py-1 text-sm font-black text-white">
                  {surveyResults.maximumDistance} km
                </span>
              </div>
              <input
                className="w-full accent-emerald-500"
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
        className="mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 text-lg font-black text-slate-950 shadow-xl shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-400"
      >
        <Search size={21} />
        Find Restaurants
      </button>
    </form>
  );
}

function QuestionCard({ icon: Icon, label, description, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
          <Icon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-xl font-black text-slate-950">{label}</h3>
          {description && <p className="mt-1 leading-6 text-slate-500">{description}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById('root')).render(<App />);
