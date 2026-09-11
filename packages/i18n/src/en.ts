import type { Catalog } from './sv.js';

/**
 * English catalog.
 *
 * Typed as `Catalog`, which is derived from the Swedish object — a missing or
 * misspelled key is a compile error, not a blank line in the interface.
 */
export const en: Catalog = {
  // ---- Brand ----
  'app.name': 'Cleat',
  'app.tagline': 'Rebuild your life.',
  'app.challenger': 'Recovery without the sermon.',
  'app.creed.religion': 'No religion.',
  'app.creed.shame': 'No shame.',
  'app.creed.judgment': 'No judgment.',
  'app.creed.bullshit': 'No bullshit.',
  'app.creed.recovery': 'Just recovery.',
  'app.subtitle': 'No shame. No religion. Just recovery.',

  // ---- The five modes ----
  'mode.reset': "I'M CRAVING",
  'mode.reset.sub': 'Acute help when the craving hits',
  'mode.now': "I'M STRUGGLING",
  'mode.now.sub': "When you're losing your footing",
  'mode.path': 'MY RECOVERY',
  'mode.path.sub': 'Your plan, your phase, your why',
  'mode.patterns': 'MY PATTERNS',
  'mode.patterns.sub': 'Triggers, behaviours and what keeps recurring',
  'mode.rebuild': 'REBUILD MY LIFE',
  'mode.rebuild.sub': 'Relationships, sleep, money, work, identity',

  // ---- Navigation and shell ----
  'nav.home': 'Home',
  'nav.coach': 'Coach',
  'nav.checkin': 'Check-in',
  'nav.stats': 'Patterns',
  'nav.plan': 'My plan',
  'nav.rebuild': 'Rebuild',
  'nav.settings': 'Settings',
  // Two unnamed navigation regions are both announced as "navigation".
  'nav.primaryLabel': 'Main navigation',
  'action.back': 'Back',
  'action.next': 'Next',
  'action.skip': 'Skip',
  'action.save': 'Save',
  'action.cancel': 'Cancel',
  'action.done': 'Done',
  'action.close': 'Close',
  'action.retry': 'Try again',
  'action.delete': 'Delete',
  'action.call': 'Call',
  // A phone number as link text is read digit by digit and never says who is
  // being called. The verb and the name belong in the accessible name.
  'action.callName': 'Call {name}',
  'action.callNumber': 'Call {name} on {number}',
  'action.continue': 'Continue',
  'common.loading': 'Loading…',
  'common.error': 'Something went wrong. Try again.',
  // A failed save has to say so, and say something the person can act on. The
  // distinction that matters is "this will work if you try again" versus "this
  // will not", because the second one means going and finding a pen.
  'common.errorOffline': "Couldn't reach the server. Check your connection — what you wrote is still here.",
  'common.errorUnavailable': "We're briefly unavailable. Try again in a moment — what you wrote is still here.",
  'common.errorRateLimited': 'Too many attempts at once. Wait a moment and try again.',
  'common.errorValidation': "That didn't go through. Check what you entered.",
  'common.errorSignedOut': 'You were signed out. Sign in again to save this.',
  'common.back': 'Back',
  'common.cancel': 'Cancel',
  'common.optional': 'Optional',
  'common.today': 'Today',
  'common.day': 'Day',
  'common.days': 'days',
  'common.hours': 'hours',
  'common.minutes': 'minutes',
  'common.of': 'of',
  'common.notEnoughData': 'Not enough data yet',

  // ---- Home screen ----
  'home.dayCount': 'Day {days}',
  'home.hoursIn': '{hours} hours in',
  'home.sinceLastUse': 'since last use',
  'home.today': 'Today',
  'home.quickActions': 'Quick actions',
  // Shown only once the current streak has passed every earlier one, so it can
  // say something that has actually happened. It is not a label for the
  // longest-streak figure — that is streak.longest.
  'home.personalRecord': 'Longer than you have ever managed',
  'home.totalInRecovery': '{days} days in recovery in total',
  'streak.title': 'Your days',
  'streak.current': 'Since last use',
  'streak.longest': 'Longest so far',
  'streak.total': 'In recovery in total',
  'home.nextMilestone': 'Next: {milestone}',
  'milestone.nextTitle': 'Next milestone',
  'milestone.reachedTitle': 'Milestones passed',
  'home.noPlanTitle': "You don't have a plan yet",
  'home.noPlanBody':
    "You don't have to be sure you're quitting to start here. We can begin by just looking at what it costs you.",
  'home.startHere': 'Start here',

  // ---- The one-tap actions ----
  'quick.craving': "I'M CRAVING",
  'quick.struggling': "I'M STRUGGLING",
  'quick.talk': 'I NEED TO TALK',
  'quick.messedUp': 'I MESSED UP',
  'quick.doingWell': "I'M DOING WELL",
  'quick.todaysPlan': "TODAY'S PLAN",
  'quick.myWhy': 'MY WHY',
  'quick.callSomeone': 'CALL SOMEONE',
  'quick.checkIn': 'CHECK IN',

  // ---- Craving engine ----
  'craving.title': "Okay. We'll take this together.",
  'craving.step.safety': 'First: are you in immediate danger?',
  'craving.step.safety.yes': 'Yes',
  'craving.step.safety.no': 'No',
  'craving.step.feeling': 'What are you feeling right now?',
  'craving.step.location': 'Where are you?',
  'craving.step.intensity': 'How strong is the craving?',
  'craving.step.coach': "Here's what we do.",
  // A one-question-per-screen flow has to say where you are and let you go
  // back. Without that, one mistyped chip is a dead end.
  'craving.step.progress': 'Step {step} of {total}',
  'craving.step.back': 'Back to the previous question',
  'craving.delay': "We decide nothing for {minutes} minutes. Just {minutes} minutes.",
  'craving.callFirst': 'Call {name} first.',
  'craving.leaveFirst':
    "The most important thing right now isn't resisting. It's leaving the place.",
  'craving.followup.what_happened_before': 'What happened right before the craving arrived?',
  'craving.logged': 'Logged. This is how we find your pattern.',
  'craving.howDidItGo': 'How did it go?',
  'craving.outcome.resisted': 'I got through it',
  'craving.outcome.used': 'I used',
  'craving.outcome.unknown': "Don't know yet",

  'feeling.craving': 'Craving',
  'feeling.panic': 'Panic',
  'feeling.loneliness': 'Loneliness',
  'feeling.anger': 'Anger',
  'feeling.stress': 'Stress',
  'feeling.boredom': 'Boredom',
  'feeling.grief': 'Grief',
  'feeling.pain': 'Pain',
  'feeling.social_pressure': 'Social pressure',
  'feeling.other': 'Something else',

  'location.home': 'At home',
  'location.work': 'At work',
  'location.on_a_break': 'On a break',
  'location.after_meal': 'After eating',
  'location.with_coffee': 'With coffee',
  'location.after_drinking': 'After drinking',
  'location.party': 'At a party',
  'location.with_users': 'With people who use',
  'location.alone': 'Alone',
  'location.in_transit': 'On my way somewhere',
  'location.other': 'Somewhere else',

  // ---- The ten-minute protocol ----
  'protocol.title': 'The ten-minute protocol',
  'protocol.stop_the_decision': "Stop the decision. You're deciding nothing right now.",
  'protocol.move_away_from_trigger': 'Move away from whatever triggered it.',
  'protocol.say_out_loud': 'Say out loud what is happening: "I am having a craving."',
  'protocol.contact_a_person': 'Contact a person. Any person.',
  'protocol.water_and_body': "Drink water. Eat something if you haven't eaten.",
  'protocol.change_environment': 'Change rooms. Go outside. Change the light.',
  'protocol.wait_ten_minutes': 'Wait ten minutes. Just ten.',
  'protocol.name_what_you_need': 'What do you actually need right now?',
  'protocol.do_the_alternative': 'Do the concrete alternative instead.',
  'protocol.come_back': 'Come back here and tell me how it went.',

  // ---- Urge surfing ----
  'surf.title': 'Ride it out',
  'surf.dont_fight': "Don't try to fight the craving.",
  'surf.observe': 'Observe it instead. Where in your body is it?',
  'surf.signal_not_order': "It's a signal, not an order.",
  'surf.notice_it_change': 'Notice how it changes while you watch it.',
  'surf.nothing_to_do': "We don't have to do anything about it right now.",
  'surf.it_peaks_and_falls': 'It rises, peaks and falls. It always does.',

  // ---- Negotiation detector ----
  'negotiation.none': '',
  'negotiation.detected':
    "May I say a gentle thing, with no finger-wagging at all? That sounds a little like the addiction itself trying to negotiate — and that isn't you, and it isn't your fault.",
  'negotiation.question':
    'Would you like us to look at the thought together for a moment, or is there something else you need from me right now?',
  'negotiation.examine': 'Examine the argument',
  'negotiation.act': 'I want to act on it',
  'negotiation.counter.just_once':
    "I understand so well how just once can feel like a small thing to ask of yourself. May I whisper one thing, with all my warmth: 'just once' rarely wants to stay one. You're not foolish for having the thought — it's the addiction being clever.",
  'negotiation.counter.earned_it':
    "And you really have been fighting for this — that's completely true, and I'm proud of you. That's exactly why I want the reward to be something you're glad about tomorrow too. You deserve what is genuinely kind to you.",
  'negotiation.counter.in_control_now':
    "I believe you, the control feels real right now. With no judgement at all, I'll just say gently: that feeling tends to arrive right before. It says nothing about your strength — only about how the addiction works.",
  'negotiation.counter.start_monday':
    "Monday sounds like a kind idea, and I honestly don't blame you for wanting to put off the hard thing. May I ask gently: what would feel like a relief if you let yourself be kind to yourself right now instead?",
  'negotiation.counter.need_it_to_sleep':
    "Sleep is a real problem, and I take it utterly seriously — we'll solve it together, you shouldn't have to lie there awake. This only moves the sleep further ahead of you. May I help you with it for real instead?",
  'negotiation.counter.need_it_to_function':
    "I hear how exhausted you are, and that's completely understandable. You carried yourself through days before, and you're stronger than you think. What's the very smallest thing you'd need just to get through the next hour — and we'll do it together?",
  'negotiation.counter.everyone_does_it':
    "It's true that others can do things you can't right now, and it's allowed to be unfair and sad. But your story is your own and precious — and you're here because you care about it. That warms my heart.",
  'negotiation.counter.deserve_it':
    "You truly deserve something good — I mean that sincerely. Let's just make sure it's something that loves you back tomorrow, not something that leaves you sad. You are worth the kind thing.",
  'negotiation.counter.last_time':
    '"Last time" carries a history, and I say that without a shred of reproach. What do you think that history is whispering to you right now — and may I stay here with you while you feel your way to it?',
  'negotiation.counter.special_occasion':
    "The occasion is real and I want you to celebrate. May I just remind you, gently: the calendar will always offer a reason. You're worth a celebration you remember with joy tomorrow.",
  'negotiation.counter.nothing_matters':
    "Oh, I hear how heavy everything feels right now, and I'm so sorry you're carrying it. Feeling that nothing matters is a feeling, not a truth about you — and it usually softens within a few hours. Stay here with me until then.",
  'negotiation.counter.testing_myself':
    "You don't have to prove anything to me — I already believe in you, exactly as you are. Something in you already knew the answer, because you came here. That's courage, and I'm proud of you for it.",

  // ---- Safety ----
  'mail.reset.subject': 'Reset your password',
  'mail.reset.body': 'You (or someone who typed in your address) asked to reset the password on your Cleat account. Open the link to choose a new one:',
  'mail.reset.expiry': 'The link stops working in {hours} hours and can only be used once.',
  'mail.reset.ignore': 'If you did not ask for this, you do not need to do anything. Your password is unchanged.',
  'mail.verify.subject': 'Confirm your email address',
  'mail.verify.body': 'Confirm the address is yours, so you can get the account back if you forget your password:',
  'mail.signature': '— Cleat',
  'safety.none': '',
  'safety.elevated':
    "Thank you for telling me how your body feels — I'm listening, and I'm glad you shared it. Be gentle with yourself and keep a little eye on the symptoms, and please don't hesitate to get medical help if they get worse. You are never a bother for doing that.",
  'safety.urgent':
    "I'm so glad you're telling me this, and precisely because I care about you I'll say it honestly and gently: this is bigger than what I alone can carry with you in an app. You deserve a real human by your side now — professional help. Would you like us to work out together what you might say when you reach out to them?",
  'safety.askDirectly':
    "I'm only asking because I care about you, with no judgement at all: are you thinking about hurting yourself, or about not being here? You don't have to explain anything. Yes or no is enough, and I'm staying right here with you whatever you answer.",
  'safety.emergency':
    "I'm right here with you, and that's exactly why I'll say it plainly: this is an emergency and it's too big for an app. Call emergency services now — please, do it right away. I'm not letting go of you, and you shouldn't be alone with this.",
  'safety.emergencyTitle': 'Are you or someone else in immediate danger?',
  'safety.important': 'Important',
  'safety.stayHere': "I'll stay right here with you while you call. You are not alone.",
  'safety.notAlone':
    "Try not to be alone right now — you deserve to have someone near. Please wake someone if you need to; that's completely okay.",
  'safety.resourcesTitle': 'Help you can call right now',
  'safety.helpMeSay': 'Help me put into words what to say to a clinician',
  'safety.disclaimer':
    'Cleat is a coach, not care. It does not replace a doctor, psychiatry, addiction treatment or emergency services.',

  'safety.detox.none': '',
  'safety.detox.alcohol':
    'Important: stopping alcohol abruptly can be life-threatening. Withdrawal can cause seizures and delirium. Talk to a clinician before you stop — they can help you do it safely.',
  'safety.detox.benzodiazepines':
    'Important: stopping benzodiazepines abruptly can be life-threatening. Tapering must be planned with a doctor. Do not do this on your own.',
  'safety.detox.sedatives':
    'Important: stopping sedatives abruptly can be life-threatening. Plan the taper with a doctor.',
  'safety.detox.opioids':
    'Important: tolerance drops fast after a break. Taking your old dose is a leading cause of fatal overdose. Ask a clinician about medication-assisted treatment.',
  'safety.detox.polysubstance':
    'Important: with several substances involved, withdrawal is harder to predict. Do not do this alone — get medical help first.',

  'resource.se.emergency': 'Emergency services (Sweden)',
  'resource.se.health': 'Swedish healthcare advice line',
  'resource.se.mind': 'Mind suicide prevention line',
  'resource.se.alcohol': 'Alcohol helpline (Sweden)',
  'resource.se.gambling': 'Gambling support line (Sweden)',
  'resource.us.emergency': 'Emergency services',
  'resource.us.crisis': 'Suicide & Crisis Lifeline',
  'resource.us.samhsa': 'SAMHSA National Helpline',
  'resource.gb.emergency': 'Emergency services',
  'resource.gb.health': 'NHS 111',
  'resource.gb.samaritans': 'Samaritans',
  'resource.generic.emergency': 'Emergency number',
  'resource.generic.local': 'Your local clinic or emergency department',

  // When to ring which number. One line each, in the words somebody would use
  // about themselves — a list of names and digits does not help a person decide
  // who to call while they are shaking.
  'resource.se.emergency.when':
    'Danger to life, overdose, somebody who will not wake up, a seizure. Around the clock.',
  'resource.se.health.when':
    'Withdrawal, physical symptoms, advice on where to go. Around the clock.',
  'resource.se.mind.when': 'Thoughts of not being here any more, with or without a plan. Around the clock.',
  'resource.se.alcohol.when': "Your own drinking or somebody else's. Anonymous. Weekdays.",
  'resource.se.gambling.when':
    'Gambling, whether you gamble or are close to somebody who does. Weekdays.',
  'resource.us.emergency.when':
    'Danger to life, overdose, somebody who will not wake up, a seizure. Around the clock.',
  'resource.us.crisis.when':
    'Thoughts of not being here any more, with or without a plan. Around the clock.',
  'resource.us.samhsa.when': 'Treatment and support for addiction. Around the clock, free.',
  'resource.gb.emergency.when':
    'Danger to life, overdose, somebody who will not wake up, a seizure. Around the clock.',
  'resource.gb.health.when': 'Withdrawal, physical symptoms, advice on where to go.',
  'resource.gb.samaritans.when': 'Anything that is too heavy to carry alone. Around the clock.',
  'resource.generic.emergency.when':
    'Danger to life, overdose, somebody who will not wake up.',
  'resource.generic.local.when':
    'Look up the number where you are — a helpline that does not answer where you stand costs you the call.',

  // ---- The crisis page: no account, no network dependency, no trace ----
  'crisis.title': 'Numbers to call now',
  'crisis.lede':
    'You do not need an account and you do not need this app. If it is an emergency, call the emergency number.',
  'crisis.noWordsTitle': 'If you do not know what to say',
  'crisis.noWordsBody':
    '"I am not doing well and I do not know who to call" is enough to get somewhere. You do not have to put it well, you do not have to have decided anything, and you do not have to be sure it is serious enough.',
  'crisis.someoneElse':
    'If you are worried about somebody else right now: do not leave them alone, put them in the recovery position if they are unconscious but breathing, and call the emergency number.',
  'crisis.detoxTitle': 'Do not stop everything at once',
  'crisis.detoxBody':
    'Stopping alcohol, benzodiazepines or other sedatives abruptly can cause seizures and delirium, and can be fatal. It is the one situation where what you were about to do is more dangerous than carrying on for another day while you get hold of care. Call the health advice line and ask.',
  'crisis.privacyNote':
    'This page loads nothing from anywhere else, stores nothing about your visit, and works without an account.',

  // ---- Relapse / "I messed up" ----
  'relapse.title': 'I messed up',
  'relapse.opening': "Oh, I'm so glad you reached out. No shame here, not a shred — you are just as welcome now as ever. We start right here, together.",
  'relapse.continuity':
    "Your earlier recovery didn't disappear. We start again from this point — with more information than last time.",
  'relapse.safety.are_you_safe': 'Are you safe right now?',
  'relapse.safety.dangerous_amount': 'Have you taken anything that could be acutely dangerous?',
  'relapse.safety.are_you_alone': 'Are you alone?',
  'relapse.safety.need_medical_help': 'Do you need medical help?',
  'relapse.autopsyTitle': "Let's look at what happened",
  'relapse.autopsyIntro':
    "This isn't an interrogation. We're looking for the system failure, not for something you did wrong.",
  'relapse.autopsy.what_happened': 'What happened?',
  'relapse.autopsy.when_did_it_start': 'When did the process start — not the using, the process?',
  'relapse.autopsy.first_trigger': 'What was the first trigger?',
  'relapse.autopsy.what_thought': 'What thought came?',
  'relapse.autopsy.what_feeling': 'What feeling came?',
  'relapse.autopsy.what_decision': 'What decision was made, and when?',
  'relapse.autopsy.ignored_warnings': 'Which warning signs got ignored?',
  'relapse.autopsy.who_was_there': 'Who was around you?',
  'relapse.autopsy.what_could_have_broken_it': 'What could have broken the chain?',
  'relapse.autopsy.what_changes_now': 'What changes now?',
  'relapse.planTitle': 'New protection plan',
  'relapse.planWarnings': 'Warning signs to catch earlier',
  'relapse.planCountermeasures': "Here's what we do instead",
  'relapse.planNeedsWork': 'The plan is thin so far. Want to fill it in with me?',
  'relapse.nextHour': 'What do we do for the next hour?',

  // ---- Check-in ----
  'checkin.morning.title': 'Morning',
  'checkin.evening.title': 'Evening',
  // Otherwise the slider's value is announced as a bare number with no scale.
  'scale.valueText': '{value} of 10',
  'checkin.mood': 'How are you doing?',
  'checkin.sleep': 'How did you sleep?',
  'checkin.stress': 'How stressed are you?',
  'checkin.craving': 'How strong is the craving?',
  'checkin.biggestRisk': "What's the biggest risk today?",
  'checkin.keyDecision': "What's the most important decision today?",
  'checkin.wentWell': 'What went well?',
  'checkin.wasHard': 'What was hard?',
  'checkin.whenCraving': 'When did the cravings come?',
  'checkin.whatWorked': 'What worked?',
  'checkin.learned': 'What did you learn?',
  'checkin.changeTomorrow': 'What needs to change tomorrow?',
  'checkin.saved': 'Saved.',
  'checkin.alreadyDone': 'You already checked in. Want to change it?',

  // ---- Reclaimed ----
  'reclaimed.moneyTitle': 'Money reclaimed',
  'reclaimed.timeTitle': 'Time reclaimed',
  'reclaimed.framing':
    "You haven't just stopped spending money. You've started buying your life back.",
  'reclaimed.thisWeek': "This week you've got {hours} hours back.",
  'reclaimed.horizon.today': 'Today',
  'reclaimed.horizon.week': 'Week',
  'reclaimed.horizon.month': 'Month',
  'reclaimed.horizon.soFar': 'So far',
  'reclaimed.horizon.year1': 'In 1 year',
  'reclaimed.horizon.year5': 'In 5 years',
  'reclaimed.projection': 'If you keep going',

  // ---- Units ----
  'unit.alcohol': 'standard drink',
  'unit.nicotine': 'cigarette/pouch',
  'unit.nicotine.smoked': 'cigarette',
  'unit.nicotine.oral': 'pouch',
  'purchase.can': 'can',
  'unit.dose': 'dose',
  'unit.session': 'session',

  // ---- Substances ----
  'substance.alcohol': 'Alcohol',
  'substance.nicotine': 'Nicotine',
  'substance.cannabis': 'Cannabis',
  'substance.opioids': 'Opioids',
  'substance.stimulants': 'Stimulants',
  'substance.benzodiazepines': 'Benzodiazepines',
  'substance.sedatives': 'Sedatives',
  'substance.polysubstance': 'Several substances',
  'substance.gambling': 'Gambling',
  'substance.other_behaviour': 'Another compulsive behaviour',

  // ---- Milestones ----
  'milestone.shared.day1': 'One day. The hardest day is the first one.',
  'milestone.shared.day3': 'Three days. Your body has started adjusting.',
  'milestone.shared.week1': "One week. You've proved it can be done one day at a time.",
  'milestone.shared.week2': 'Two weeks. Sleep and mood usually start settling here.',
  'milestone.shared.month1': 'One month. Routines start carrying you instead of the reverse.',
  'milestone.shared.month3': 'Three months. Many people describe the head feeling clearer now.',
  'milestone.shared.month6': "Six months. This isn't an experiment any more.",
  'milestone.shared.year1': "One year. You're a person who lives like this now.",

  'milestone.alcohol.h12': '12 hours. Blood sugar starts to stabilise.',
  'milestone.alcohol.h72': '72 hours. Acute withdrawal has usually passed its peak.',
  'milestone.alcohol.week1': 'One week. Sleep usually deepens, even if it starts out messy.',
  'milestone.alcohol.month1': 'One month. Many notice better skin, sleep and energy here.',
  'milestone.alcohol.month3': 'Three months. Your liver has had real time to recover.',
  'milestone.alcohol.year1':
    'One year without alcohol. A full round of seasons, holidays and crises.',

  'milestone.source': 'Source: {source}',
  'milestone.nicotine.min20': '20 minutes. Your pulse is heading back towards normal, and the carbon monoxide in your blood has halved.',
  'milestone.nicotine.h12': '12 hours. Carbon monoxide in your blood is back to a normal level.',
  'milestone.nicotine.h24': 'One day. The nicotine is effectively out of your blood. This is also about when it tends to be hardest — that does not mean anything has gone wrong.',
  'milestone.nicotine.h48': '48 hours. Carbon monoxide is down to the level of someone who never smoked. Taste and smell are starting to come back.',
  'milestone.nicotine.h72': 'Three days. This is usually about where withdrawal peaks. From here it mostly heads the right way.',
  'milestone.nicotine.week3': 'Three weeks. Withdrawal has usually let go by now — the sleep, the irritability, the concentration.',
  'milestone.nicotine.week2': 'Two weeks. Your risk of a heart attack has started dropping, and the cough is easing.',
  'milestone.nicotine.month1': 'One month. Breathing is easier and your energy lasts longer than it did.',
  'milestone.nicotine.week12': 'Twelve weeks. Circulation has improved and lung function is up by as much as ten percent.',
  'milestone.nicotine.year1': 'One year. Your risk of a heart attack is half that of someone who kept smoking. Your risk of dying from lung cancer is halved too.',
  'milestone.nicotine.year5': 'Five years. Your risk of stroke is approaching that of someone who never smoked.',
  'milestone.nicotine.year15': 'Fifteen years. Your risk of coronary heart disease is back to that of someone who never smoked.',

  'milestone.opioids.h12': "12 hours. The worst is ahead, but it's bounded.",
  'milestone.opioids.h72': '72 hours. Acute withdrawal usually peaks here.',
  'milestone.opioids.week1':
    'One week. Remember: your tolerance is low now. An old dose is dangerous.',
  'milestone.opioids.month1': 'One month. Sleep and appetite start finding their way back.',
  'milestone.opioids.month3': 'Three months. Many describe their baseline mood lifting here.',

  'milestone.stimulants.h72': "72 hours. The crash is usually worst now — it passes.",
  'milestone.stimulants.week1': 'One week. Sleep usually starts returning.',
  'milestone.stimulants.month1':
    "One month. Nothing feeling enjoyable is withdrawal, not your life.",
  'milestone.stimulants.month3': 'Three months. Pleasure in ordinary things usually returns here.',

  'milestone.cannabis.h72': '72 hours. Sleep trouble and irritability usually peak now.',
  'milestone.cannabis.week2': 'Two weeks. Dreams settle down, sleep gets more normal.',
  'milestone.cannabis.month1': 'One month. Many notice sharper memory and motivation.',
  'milestone.cannabis.month3': 'Three months. Anxiety levels have usually settled.',

  'milestone.gambling.h72': '72 hours. The strongest urges usually come in waves now.',
  'milestone.gambling.week2': 'Two weeks. Urges get further apart once the pattern breaks.',
  'milestone.gambling.month1': 'One month. Your finances start being possible to look at.',
  'milestone.gambling.month3': "Three months. You've had time to make a real plan.",

  // ---- Phases ----
  'phase.insight': 'Insight',
  'phase.decision': 'Decision',
  'phase.preparation': 'Preparation',
  'phase.day_zero': 'Day zero',
  'phase.acute': 'Acute phase',
  'phase.stabilization': 'Stabilization',
  'phase.identity': 'Identity',
  'phase.relapse_prevention': 'Relapse prevention',
  'phase.reason.no_active_plan': "You don't have an active plan yet.",
  'phase.reason.day_zero': "You've just started. We're only looking at the next few hours.",
  'phase.reason.acute_window': "You're in the acute phase. The goal is getting through the day.",
  'phase.reason.building_stability': "You're building stability in everyday life.",
  'phase.reason.identity_rebuild': "You're building a life, not just a break from using.",
  'phase.reason.long_term': "You're a long way in. Now it's about protecting what you built.",

  'focus.map_the_cost': "Map what it's actually costing you",
  'focus.name_the_pattern': 'Put the pattern into words',
  'focus.what_changed_now': "What's made you start thinking about this now?",
  'focus.write_my_why': 'Write your why',
  'focus.what_i_want_back': 'What do you want back?',
  'focus.readiness_scale': 'How ready are you, on a scale of 1–10?',
  'focus.trigger_map': 'Build your trigger map',
  'focus.remove_access': 'Remove the access',
  'focus.support_network': 'Who knows about this?',
  'focus.next_ten_minutes': 'The next ten minutes',
  'focus.tonight_plan': 'A plan for tonight',
  'focus.who_to_call': 'Who do you call if it gets hard?',
  'focus.get_through_today': 'Get through today',
  'focus.sleep_and_food': 'Sleep and food',
  'focus.craving_protocol': 'Keep the protocol ready',
  'focus.daily_routine': 'Build a routine that holds',
  'focus.money_and_work': 'Money and work',
  'focus.people_and_places': 'People and places',
  'focus.who_am_i_now': 'Who am I without the addiction?',
  'focus.rebuild_relationships': 'Repair relationships',
  'focus.meaningful_activity': 'Something that means something',
  'focus.warning_signs': 'Recognise your warning signs',
  'focus.protection_plan': 'Keep the protection plan alive',
  'focus.keep_the_network': "Don't lose the network",

  // ---- Recovery indicators ----
  'indicator.title': 'Your indicators',
  'indicator.explainer':
    "There is no total score here. Recovery isn't a video game — these are seven separate trends you can act on.",
  'indicator.stability': 'Stability',
  'indicator.stability.desc': 'How steady everyday life is right now.',
  'indicator.craving_control': 'Craving control',
  'indicator.craving_control.desc': 'How you handle cravings when they come.',
  'indicator.routine': 'Routine',
  'indicator.routine.desc': 'How stable your routines are.',
  'indicator.connection': 'Connection',
  'indicator.connection.desc': 'Contact with people.',
  'indicator.purpose': 'Purpose',
  'indicator.purpose.desc': 'Meaningful activity and direction.',
  'indicator.self_trust': 'Self-trust',
  'indicator.self_trust.desc': 'Your ability to keep your own decisions.',
  'indicator.risk': 'Risk',
  'indicator.risk.desc': 'Current relapse risk. Lower is better here.',
  'indicator.trend.up': 'Rising',
  'indicator.trend.down': 'Falling',
  'indicator.trend.flat': 'Steady',
  'indicator.trend.unknown': 'No trend yet',
  'indicator.confidence.low': 'Based on little data',
  'indicator.confidence.medium': 'Based on some data',
  'indicator.confidence.high': 'Based on a lot of data',
  'indicator.samples': 'Based on {count} observations',

  // ---- Insights ----
  'insight.title': 'Your pattern',
  'insight.subtitle': 'This is what your own data says. Does it match?',
  'insight.time_of_day': 'Your cravings mostly come {period} — {percent}% of them.',
  'insight.weekday': 'Your cravings cluster on {weekday} — {percent}% of them.',
  'insight.trigger': '"{trigger}" has set off a craving {count} times.',
  'insight.location': '{percent}% of your cravings have come {location}.',
  'insight.sleep':
    'After bad nights your cravings run {delta} points stronger on average. Based on {poorNights} occasions.',
  'insight.stress':
    'On stressful days your cravings run {delta} points stronger on average. Based on {highDays} occasions.',
  'insight.what_works': '"{action}" has worked for you {count} times.',
  'insight.period.night': 'at night',
  'insight.period.morning': 'in the morning',
  'insight.period.afternoon': 'in the afternoon',
  'insight.period.evening': 'in the evening',
  'insight.weekday.0': 'Sundays',
  'insight.weekday.1': 'Mondays',
  'insight.weekday.2': 'Tuesdays',
  'insight.weekday.3': 'Wednesdays',
  'insight.weekday.4': 'Thursdays',
  'insight.weekday.5': 'Fridays',
  'insight.weekday.6': 'Saturdays',
  'insight.location.home': 'at home',
  'insight.location.work': 'at work',
  'insight.location.party': 'at parties',
  'insight.location.with_users': 'around people who use',
  'insight.location.alone': 'when you were alone',
  'insight.location.in_transit': 'on your way somewhere',
  'insight.location.other': 'in other places',

  // ---- Mantras ----
  'mantra.craving_is_not_command': 'A craving is not a command.',
  'mantra.thought_is_not_decision': 'A thought is not a decision.',
  'mantra.delay_the_decision': 'Delay the decision.',
  'mantra.change_the_environment': 'Change the environment.',
  'mantra.tell_someone': 'Tell someone.',
  'mantra.one_good_decision': 'One good decision at a time.',
  'mantra.relapse_is_information': 'A relapse is information.',
  'mantra.shame_feeds_the_cycle': 'Shame feeds the cycle.',
  'mantra.you_are_not_your_addiction': 'You are not your addiction.',
  'mantra.your_next_decision_matters': 'Your next decision matters.',
  'mantra.dontHaveToWin': "You don't have to win the rest of your life today.",
  'mantra.tenMinutes': "Okay. Then we just take the next ten minutes.",

  // ---- Toolbox ----
  'toolbox.title': 'Toolbox',
  'toolbox.category.acute': 'Acute',
  'toolbox.category.cognitive': 'Thinking',
  'toolbox.category.behavioural': 'Behaviour',
  'toolbox.category.social': 'Social',
  'toolbox.category.life': 'Building a life',
  'toolbox.minutes': '{minutes} min',

  'tool.delay_10_minutes': 'Wait ten minutes',
  'tool.change_environment': 'Change your environment',
  'tool.call_someone': 'Call someone',
  'tool.urge_surfing': 'Ride it out',
  'tool.grounding_54321': 'Grounding 5-4-3-2-1',
  'tool.slow_breathing': 'Slow breathing',
  'tool.drink_water_eat': 'Water and food',
  'tool.move_your_body': 'Move your body',
  'tool.remove_the_trigger': 'Remove the trigger',
  'tool.cold_water': 'Cold water on your face',
  'tool.leave_the_situation': 'Leave the situation',
  'tool.name_the_negotiation': 'Name the negotiation',
  'tool.play_the_tape_forward': 'Play the tape forward',
  'tool.read_my_why': 'Read your why',
  'tool.decisional_balance': 'Weigh it up',
  'tool.challenge_the_thought': 'Challenge the thought',
  'tool.reframe': 'Reframe it',
  'tool.implementation_intention': 'If–then plan',
  'tool.habit_replacement': 'Replace the habit',
  'tool.design_the_evening': 'Design the evening',
  'tool.reward_substitution': 'Substitute the reward',
  'tool.schedule_the_day': 'Lay out the day',
  'tool.block_access': 'Block the access',
  'tool.contact_trusted_person': 'Contact someone you trust',
  'tool.peer_support': 'Meet others in recovery',
  'tool.book_professional': 'Book professional help',
  'tool.tell_someone_today': 'Tell someone today',
  'tool.sleep_routine': 'Sleep routine',
  'tool.exercise': 'Exercise',
  'tool.money_plan': 'A plan for your money',
  'tool.work_next_step': 'Next step with work',
  'tool.repair_a_relationship': 'Repair a relationship',
  'tool.do_something_you_like': 'Do something you actually like',

  // ---- Trigger map ----
  'trigger.title': 'My trigger map',
  'trigger.intro':
    "A craving feels like one event. It isn't — it's a chain. Once you can see the links written down it stops feeling inevitable.",
  'trigger.step.trigger': 'Trigger',
  'trigger.step.thought': 'Thought',
  'trigger.step.feeling': 'Feeling',
  'trigger.step.impulse': 'Impulse',
  'trigger.step.action': 'Action',
  'trigger.step.consequence': 'Consequence',
  'trigger.add': 'Add a trigger',
  'trigger.label': "What's the trigger?",
  'trigger.empty': "You haven't mapped any triggers yet.",
  'trigger.whereToBreak': 'Where can you break the chain?',

  // ---- Cleat Now: I'm struggling ----
  'now.intro':
    "This isn't acute yet. It's the hour before — the one that actually decides. We change something cheap now instead of something expensive later.",
  'now.whatIsHappening': "What's going on?",
  'now.iAm': 'I feel',
  'now.cheapest': 'The cheapest things that tend to work',
  'now.ifItGetsWorse': 'If it grows into a real craving:',

  // ---- Toolbox filters ----
  'toolbox.all': 'Everything',
  'toolbox.quickOnly': 'Quick ones',

  // ---- Offline ----
  'offline.banner': "No connection — but what you need is here anyway.",
  'offline.planSource': 'This plan came from your phone, not the server.',
  'offline.queued': "Logged on your device. It'll sync when you're back online.",
  'offline.notLogged': "Couldn't save that right now. The moment counts anyway.",
  'offline.noKit':
    "We haven't saved your details for offline use yet. The protocol below still works.",
  'offline.title': "You're offline",
  'offline.body':
    'The ten-minute protocol, the tools and your why all work without a connection. Open "I\'m craving" as normal.',

  // ---- Rebuild my life ----
  'rebuild.title': 'Rebuild my life',
  'rebuild.intro':
    "This is the bigger part. Stopping is the beginning — this is what means you don't have to start over.",
  'rebuild.domain.health': 'Health',
  'rebuild.domain.health.desc': "Sleep, food, body, the care you've been putting off.",
  'rebuild.domain.sleep': 'Sleep',
  'rebuild.domain.sleep.desc': 'The single biggest lever on your cravings.',
  'rebuild.domain.relationships': 'Relationships',
  'rebuild.domain.relationships.desc': 'Who was affected? What needs acknowledging?',
  'rebuild.domain.money': 'Money',
  'rebuild.domain.money.desc': 'A clear picture, debts, a plan you can actually follow.',
  'rebuild.domain.work': 'Work',
  'rebuild.domain.work.desc': 'Structure, meaning, a living.',
  'rebuild.domain.exercise': 'Exercise',
  'rebuild.domain.exercise.desc': 'Movement that regulates stress, not performance.',
  'rebuild.domain.social': 'Social life',
  'rebuild.domain.social.desc': 'People and places — which carry you, which pull you down?',
  'rebuild.domain.home': 'Home',
  'rebuild.domain.home.desc': 'A safe place to be.',
  'rebuild.domain.identity': 'Identity',
  'rebuild.domain.identity.desc': 'Who am I without the addiction?',
  'rebuild.domain.purpose': 'Purpose',
  'rebuild.domain.purpose.desc': 'Something that means something. Plans for the future.',
  'rebuild.status.untouched': 'Not started',
  'rebuild.status.working': 'In progress',
  'rebuild.status.steady': 'Steady',
  'rebuild.pickOne': 'Pick one area. Not all of them. One.',
  'rebuild.lockedTitle': 'Comes later',
  'rebuild.lockedBody':
    "Nothing is being kept from you — this just isn't realistic to work on yet. It opens up once everyday life is holding.",
  'rebuild.relationships.q1': 'Who was affected?',
  'rebuild.relationships.q2': 'What needs acknowledging?',
  'rebuild.relationships.q3': 'What promise can you actually keep?',
  'rebuild.relationships.q4': 'What do you need to stop promising?',
  'rebuild.relationships.lesson': 'Action counts for more than promise.',

  'rebuild.reason.sleep_evidence':
    'Your own data points here: sleep has been poor for several nights, and your cravings track it.',
  'rebuild.reason.connection_low': 'Contact with people is thin right now. That is the one that goes first.',
  'rebuild.reason.stability_low': 'Everyday life is shaky. We start with the basics.',
  'rebuild.reason.default': 'This is the next thing that carries the most weight.',

  // ---- My why / future self ----
  'why.title': 'My why',
  'why.prompt': 'What do you want back?',
  'why.questions.cost': 'What has the addiction cost you?',
  'why.questions.who': 'Who do you want to be?',
  'why.questions.year': 'What do you want to be able to do in a year?',
  'why.questions.nothing': 'What happens if nothing changes?',
  'why.empty': "You haven't written your why yet. It's what carries you when it gets hard.",
  'why.write': 'Write your why',
  'future.title': 'Future self',
  'future.30': 'In 30 days',
  'future.90': 'In 90 days',
  'future.1y': 'In 1 year',
  'future.5y': 'In 5 years',
  'future.letter': 'A letter from your future self',

  // ---- Support network ----
  'support.title': 'My network',
  'support.empty':
    "You haven't added anyone yet. Even one name makes a difference at two in the morning.",
  'support.add': 'Add a person',
  'support.name': 'Name',
  'support.relation': 'Relationship',
  'support.phone': 'Phone',
  'support.primary': 'Call this one first',
  'support.noRequirement':
    'Cleat will never require you to join any organisation, group or movement.',

  // ---- Coach ----
  'coach.title': 'Coach',
  'coach.placeholder': "Tell me what's happening…",
  'coach.send': 'Send',
  'coach.thinking': 'Thinking…',
  'coach.offline':
    "I'm not quite connected right now, but I'm still here with you and all the tools work. Would you like us to go through the ten minutes together?",
  'coach.greeting.day_zero': "You've started — do you know how big that is? I'm so glad you're here. We'll take just the next ten minutes, together.",
  'coach.greeting.acute': "I'm right here with you. How is it in this exact moment — not the whole day, just right now?",
  'coach.greeting.stabilization': "It's so good to hear from you. What's been heaviest this week? We'll carry it together.",
  'coach.greeting.identity': "I'm proud of where you are. What do you dream of building next?",
  'coach.greeting.default': "Hi, I'm so glad you're here. What's stirring in you right now?",
  'coach.notATherapist': "I'm your coach, and I truly care about you — but I'm not your doctor, not your therapist, and absolutely not your judge.",

  // ---- Auth and onboarding ----
  'auth.signIn': 'Sign in',
  'auth.signUp': 'Create account',
  'auth.signOut': 'Sign out',
  'auth.email': 'Email',
  'auth.password': 'Password',
  'auth.displayName': 'What should I call you?',
  'auth.haveAccount': 'Already have an account?',
  'auth.noAccount': 'No account yet?',
  'auth.invalid': 'Wrong email or password.',
  'auth.weakPassword': 'Password must be at least 12 characters.',
  'auth.emailTaken': 'There is already an account with that email.',
  'auth.forgotPassword': 'Forgotten your password?',
  'auth.forgotTitle': 'Reset your password',
  'auth.forgotBody':
    'Enter the address you used. We will send a link there that lasts two hours and works once.',
  'auth.forgotSend': 'Send the link',
  // Deliberately the same answer whether or not the account exists. Who has an
  // account here is itself sensitive.
  'auth.forgotSent':
    'If there is an account with that address, an email is on its way. Check the spam folder too.',
  'auth.backToSignIn': 'Back to sign in',
  'auth.resetTitle': 'Choose a new password',
  'auth.resetBody':
    'Saving signs out every device, including this one. That is deliberate: if somebody else has been in the account, they should not still be.',
  'auth.resetNewPassword': 'New password',
  'auth.resetSave': 'Save and sign in',
  'auth.resetDone': 'Done. Sign in with the new password.',
  'auth.resetInvalid': 'That link has been used or has expired. Ask for a new one.',
  'auth.resetNoToken': 'That link is missing its key. Open it straight from the email.',
  'auth.verifyTitle': 'Confirm your email address',
  'auth.verifyWorking': 'One moment.',
  'auth.verifyDone':
    'Thank you — the address is confirmed. You can now get the account back if you forget your password.',
  'auth.verifyInvalid': 'That link has been used or has expired.',
  'auth.forgotMobileHint':
    'The link opens in your browser. Come back here and sign in once you have chosen a new password.',

  // Two-factor. The tone matters here: this is a lock on the most private
  // record most people will ever keep, and the reason to use it is concrete —
  // not "best practice", but the specific person who might read it.
  'auth.totpTitle': 'Two-step sign-in',
  'auth.totpOn': 'On',
  'auth.totpOffBody':
    'A password on its own can be guessed, reused or already known to somebody who lives with you. With this on, signing in also needs a code from your phone.',
  'auth.totpEnable': 'Turn on two-step sign-in',
  'auth.totpSetupBody':
    'Add this key to an authenticator app, then type the six-digit code it gives you. Nothing changes until that code is accepted, so a mistyped key cannot lock you out.',
  'auth.totpSecretLabel': 'Your key',
  'auth.totpCode': 'Code',
  'auth.totpConfirm': 'Confirm and turn on',
  'auth.totpWrongCode': 'That code did not match. Check the clock on your phone and try the next one.',
  'auth.totpNotStarted': 'Start again — that setup is no longer open.',
  'auth.totpAlreadyOn': 'Two-step sign-in is already on.',
  'auth.totpDisable': 'Turn off two-step sign-in',
  'auth.totpDisablePassword': 'Your password',
  'auth.totpCodesLeft': '{count} recovery codes left',
  'auth.totpRecoveryTitle': 'Save these recovery codes',
  'auth.totpRecoveryBody':
    'Each one signs you in once if you lose your phone. This is the only time they are shown. Without them, a lost phone means a lost account — and everything you have recorded in it.',
  'auth.totpRecoveryDownload': 'Download as a file',
  'auth.totpRecoverySaved': "I've saved them",
  'auth.totpPrompt': 'Enter the code from your authenticator app.',
  'auth.totpRecoveryHint': 'Lost your phone? Use one of your recovery codes instead.',
  'auth.totpChallengeExpired': 'That took too long, or too many codes were wrong. Sign in again.',
  'onboarding.welcome': 'Welcome to Cleat',
  'onboarding.intro':
    "This isn't a programme to complete. It's a tool for making the next good decision.",
  'onboarding.pickSubstance': 'What do you want to leave behind?',
  'onboarding.intakeForm': 'Do you smoke or use snus?',
  'onboarding.intakeForm.hint': 'We ask because the timeline about lungs and carbon monoxide only applies to somebody who smoked. We would rather not claim things about your body that are not true.',
  'intake.smoked': 'Smoke',
  'intake.oral': 'Snus / pouches',
  'intake.both': 'Both',
  'onboarding.usage': 'How much did it usually come to?',
  'onboarding.unitsPerDay': 'How many {unit} a day?',
  'onboarding.purchaseCost': 'What does one {purchase} cost?',
  'onboarding.purchaseSize': 'How many in a {purchase}?',
  'purchase.pack': 'pack',
  'onboarding.cost': 'Roughly what does one {unit} cost?',
  'onboarding.startDate': 'When did you stop — or when are you planning to?',
  'onboarding.notReadyYet': "I haven't stopped yet",
  'onboarding.done': "Done. We start where you are.",

  // ---- Settings and privacy ----
  'settings.title': 'Settings',
  'settings.language': 'Language',
  'settings.language.sv': 'Svenska',
  'settings.language.en': 'English',
  'settings.country': 'Country (for the right emergency numbers)',
  'settings.timezone': 'Time zone',
  'privacy.title': 'Your data',
  'privacy.whatWeKnow': 'What does the app know?',
  'privacy.whyWeKnow': 'Why does it know it?',
  'privacy.whoSees': 'Who can see it?',
  'privacy.principles':
    'Recovery data is extremely sensitive. We minimise collection, never sell your data, build no ad profiles, and share nothing with insurers or employers.',
  'privacy.storedTitle': 'This is what is stored about you',
  'privacy.category.account': 'Account (email, name, language)',
  'privacy.category.profile': 'Your why',
  'privacy.category.quitPlan': 'Your plan',
  'privacy.category.relapses': 'Relapses you logged',
  'privacy.category.checkIns': 'Check-ins',
  'privacy.category.cravings': 'Cravings you logged',
  'privacy.category.supportContacts': 'Support contacts',
  'privacy.sharingTitle': 'What happens to it',
  'privacy.sharing.soldToThirdParties': 'Sold to anybody else',
  'privacy.sharing.usedForAdvertising': 'Used for ad profiles',
  'privacy.sharing.sharedWithInsurers': 'Shared with insurers',
  'privacy.sharing.sharedWithEmployers': 'Shared with employers',
  'privacy.sharing.no': 'No',
  'privacy.sharing.yes': 'Yes — ask whoever runs this installation why',
  'privacy.export': 'Export everything I have',
  'privacy.exportDone': 'Export complete.',
  'privacy.delete': 'Delete my account and all data',
  'privacy.deleteConfirm':
    'This permanently deletes everything and cannot be undone. Type DELETE to confirm.',
  'privacy.deleteWord': 'DELETE',
  'privacy.deletePassword': 'Your password',
  'privacy.deletePasswordWhy':
    'We ask for your password too. A confirmation word stops an accident — only the password stops somebody else who picked up your unlocked phone.',
  'privacy.deleteWrongPassword': 'Wrong password. Nothing has been deleted.',
  'privacy.deleted': "Everything is deleted. Take care of yourself.",
  'privacy.exportShare': 'Share or save the export',
  'privacy.exportLarge':
    'The export is large ({kilobytes} kB). Some apps truncate long text — open the web version if you want it as a file.',

  // ---- Cleat Near — for the person standing next to it ----
  'near.title': 'For the person standing next to it',
  'near.tagline': 'You are not the reason, and you are not the cure. But you live in the middle of it.',
  'near.intro':
    'This is for you if you are the partner, parent, child, sibling or friend of somebody who uses. It is not connected to their account and shows nothing about them. It exists so you can understand what is actually happening, and so that you are still here when this is over.',
  'near.noAccountNeeded': 'You need no account to read this, and the visit is stored nowhere.',

  'near.emergencyTitle': 'When it stops being a conversation',
  'near.emergencyLede':
    'Call the emergency number first and read the rest afterwards. These are not situations to solve alone.',
  'near.sign.unresponsive': 'Cannot be woken, or only surfaces for a second.',
  'near.sign.seizure': 'Seizures, shaking that will not stop, rigidity.',
  'near.sign.breathing': 'Slow, rattling or irregular breathing. Blue lips or fingers.',
  'near.sign.confusion': 'Seeing or hearing things that are not there, not knowing where they are.',
  'near.sign.talking_about_dying': 'Talking about not wanting to be here, or saying goodbye.',
  'near.sign.alcohol_or_benzo_withdrawal':
    'Stopping alcohol or sedatives abruptly and becoming shaky, sweating, confused — the withdrawal itself can be fatal.',
  'near.recoveryPosition':
    'If they are unconscious but breathing: put them in the recovery position and stay until help arrives.',

  'near.understandTitle': 'What is actually happening',
  'near.topic.what_a_craving_is': 'A craving is not a craving for something nice',
  'near.topic.what_a_craving_is.body':
    'It is closer to thirst or panic than to wanting a treat. The body raises an alarm that something is wrong and points at one solution. It passes — most cravings peak within twenty minutes — but while it runs, thinking about anything else is hard. That is why ten minutes can be the difference, and why "can you not just not" lands like a question from another planet.',
  'near.topic.the_negotiation_voice': 'The voice that negotiates',
  'near.topic.the_negotiation_voice.body':
    '"Just once." "I have been good." "I will start on Monday." "I need it to sleep." It sounds like decisions and it is not — it is the addiction arguing, and it is often very convincing. When you hear it you are not talking to the whole person. That is not the same as them lying to you on purpose.',
  'near.topic.why_willpower_framing_fails': 'Why "pull yourself together" does not work',
  'near.topic.why_willpower_framing_fails.body':
    'It is not that they care too little about you. Addiction changes how the brain values things in the moment, not how much somebody loves their children. Explaining the consequences one more time does not fix something that was never about not knowing — they already know. And shame measurably makes it worse: it is one of the most common routes back to using.',
  'near.topic.why_they_lie': 'Why you get lied to',
  'near.topic.why_they_lie.body':
    'Almost always to avoid the shame and to avoid the conversation, rarely to fool you specifically. That does not make it acceptable and you do not have to accept it. But knowing where it comes from makes it easier to answer without the whole evening turning into an interrogation.',
  'near.topic.withdrawal_can_be_dangerous': 'Stopping abruptly can be dangerous',
  'near.topic.withdrawal_can_be_dangerous.body':
    'Alcohol, benzodiazepines and other sedatives can cause seizures and delirium when stopped suddenly, and that can be life-threatening. After a break from opioids, tolerance drops — the old dose can then be enough for a fatal overdose, which is why relapse after a period of abstinence is especially dangerous. Never force an abrupt stop on your own. Call the health advice line and ask.',
  'near.topic.relapse_is_not_a_moral_failure': 'A relapse does not mean it was all for nothing',
  'near.topic.relapse_is_not_a_moral_failure.body':
    'Relapse is common in recovery, much as it is in other chronic conditions. It does not erase the months before — those remain as experience, as know-how, as proof that it is possible. What usually matters is how quickly somebody comes back, not that it happened.',
  'near.topic.what_actually_helps': 'What actually helps',
  'near.topic.what_actually_helps.body':
    'Being predictable. Saying what you will do rather than what they must do. Keeping on inviting them into the life outside the addiction. Talking about something else sometimes. Answering calmly when they tell you something difficult, so that telling you is still possible next time. Separating the person from the behaviour, out loud.',
  'near.topic.what_does_not_help': 'What rarely helps',
  'near.topic.what_does_not_help.body':
    'Ultimatums you do not intend to keep. Pouring things away or hiding them. Policing amounts. Taking over the bills, the job and the consequences. Arguing with somebody who is intoxicated — that person will not remember the conversation. Making yourself the treatment: you cannot be both family and clinician, and refusing that role is not mean.',
  'near.topic.you_did_not_cause_it': 'You did not cause it',
  'near.topic.you_did_not_cause_it.body':
    'You cannot have caused an addiction by being the wrong sort of partner, parent or child. You cannot control it, and you cannot cure it. What you can do is decide what you yourself do, and not disappear in the meantime.',

  'near.checkTitle': 'Where are you in all this?',
  'near.checkLede':
    'Fourteen statements about completely ordinary weeks. Answer as things are, not as you think they ought to be. Nothing is sent anywhere — this is worked out on your device and gone when you close the page.',
  'near.checkNotADiagnosis':
    'This is not a test and not a diagnosis. The word "co-dependency" gets used in twenty different ways and is not used here. This only reflects back what your own answers said.',
  'near.scale.0': 'Never',
  'near.scale.1': 'Sometimes',
  'near.scale.2': 'Often',
  'near.scale.3': 'Almost always',
  'near.checkResult': 'This is what your answers said',
  'near.checkTooLittle': 'Too few answers to say anything. Fill in more if you want something here.',
  'near.checkNothingLoud':
    'No pattern stands out in your answers. That does not mean it is easy — only that what you filled in does not point anywhere in particular today.',
  'near.checkReset': 'Start again',

  'near.statement.count_what_is_left': 'I keep track of how much is left.',
  'near.statement.check_their_things': 'I search their things, phone or pockets.',
  'near.statement.covered_for_them': 'I have explained them away to other people.',
  'near.statement.paid_what_was_theirs': 'I have paid or fixed things that were their responsibility.',
  'near.statement.said_last_time_again': 'I have said "this is the last time" more than once.',
  'near.statement.agree_to_avoid_a_fight': 'I say yes to things to avoid the argument.',
  'near.statement.stopped_doing_what_i_liked': 'I have stopped doing things I used to enjoy.',
  'near.statement.sleep_badly_from_worry': 'I sleep badly because I am worried.',
  'near.statement.keep_people_away': 'I keep other people away from the house.',
  'near.statement.avoid_saying_how_it_is': 'I avoid telling anyone how things actually are.',
  'near.statement.think_it_is_my_fault': 'I think it is something I have done.',
  'near.statement.search_for_what_i_missed': 'I go over what I should have seen sooner.',
  'near.statement.read_the_mood_first': 'I read the mood before I say anything.',
  'near.statement.calm_only_when_i_know_where': 'I am only calm once I know where they are.',

  'near.pattern.control': 'You are keeping track',
  'near.pattern.control.body':
    'Counting, searching and checking makes sense — it is an attempt to get some predictability back. It just tends not to work: amounts can be hidden, and you are left with the work. What you get in return is that part of your attention is permanently on another person’s body.',
  'near.pattern.control.step':
    'Try picking one thing you stop counting for a week, and notice what actually happens.',
  'near.pattern.rescue': 'You catch everything before it lands',
  'near.pattern.rescue.body':
    'Covering and paying is love under pressure. It is also what makes the consequences land on you instead of where they arose — and consequences are often what eventually moves somebody to get help. This is not "you are enabling it". It is that you are carrying something that is not yours.',
  'near.pattern.rescue.step':
    'Consider what you would stop doing if you knew it did not help. Start with the smallest one.',
  'near.pattern.boundaries': 'Your boundaries keep moving',
  'near.pattern.boundaries.body':
    '"The last time" that became several times is not weakness. It usually means the boundary was phrased as a demand on them rather than as a statement about what you will do — and that kind of boundary is impossible to keep, because you do not control their behaviour.',
  'near.pattern.boundaries.step':
    'Rewrite one boundary so it is only about you: "I will drive you to the hospital. I will not give you money."',
  'near.pattern.own_needs': 'You have disappeared a little',
  'near.pattern.own_needs.body':
    'Sleep, friends and the things you enjoyed are not rewards you get once they are well. They are what makes staying possible at all. This often runs for years, and nobody manages years of being on call around the clock.',
  'near.pattern.own_needs.step':
    'Put one thing in the diary this week that is yours and is not about them. One is enough.',
  'near.pattern.secrecy': 'It has gone quiet around you',
  'near.pattern.secrecy.body':
    'Keeping people away protects them from shame and you from questions. The price is that you are alone with it, and isolation is one of the things that makes this hardest to carry. You do not have to tell everyone. But one more human being knowing is not the same as gossip.',
  'near.pattern.secrecy.step': 'Pick one person who gets to know how things actually are at home.',
  'near.pattern.blame': 'You are looking for your own fault in it',
  'near.pattern.blame.body':
    'Going over what you should have seen is a way of trying to put order into something that is not orderly. But you did not cause it, you cannot control it, and you cannot cure it. That is not a comforting phrase — it is simply not your access.',
  'near.pattern.blame.step':
    'Next time the thought comes: write down what you could actually have decided in that situation.',
  'near.pattern.hypervigilance': 'You are always on watch',
  'near.pattern.hypervigilance.body':
    'Reading the mood before you speak, and only being calm once you know where they are — that is a body that has been on alert for too long. It usually shows up in sleep, in your stomach and in your temper long before anybody connects it.',
  'near.pattern.hypervigilance.step':
    'Tell somebody who is not them how your week has actually been. A clinician counts.',

  'near.boundariesTitle': 'Sentences you can say out loud',
  'near.boundariesLede':
    'A boundary is not a threat. It is a statement about what you will do — the only part anybody controls.',
  'near.boundary.asked_for_money': 'They ask for money',
  'near.boundary.asked_for_money.say':
    '"I am not giving you money. I will buy food with you, and I will sit with you while you call for help."',
  'near.boundary.drunk_at_home': 'They come home intoxicated',
  'near.boundary.drunk_at_home.say':
    '"I am not discussing this tonight. We will do it tomorrow when you are sober." And then do that.',
  'near.boundary.promises_again': 'They promise again',
  'near.boundary.promises_again.say':
    '"I believe you mean it. I stopped going by promises — I go by what happens."',
  'near.boundary.wants_a_lift': 'They want a lift to a party',
  'near.boundary.wants_a_lift.say':
    '"I will not drive you there. I will pick you up whenever you want to come home, no complaints."',
  'near.boundary.blames_you': 'They blame you',
  'near.boundary.blames_you.say':
    '"I am not the reason you use. I am still here, but I am not taking this."',
  'near.boundary.family_dinner': 'The dinner where everyone is watching',
  'near.boundary.family_dinner.say':
    'Decide in advance what you will do if it goes wrong, and tell them beforehand: "If it goes like that, I am going home at nine."',
  'near.boundary.driving': 'They are about to drive',
  'near.boundary.driving.say':
    'This one is not a boundary to negotiate. Take the keys if you can, do not get in the car, and call the emergency number if they drive anyway.',

  'near.resourcesTitle': 'You are allowed somewhere to go too',
  'support.se.alcohol_line': 'Alcohol helpline (Sweden) — also answers relatives',
  'support.se.gambling_line': 'Gambling support line — for people close to somebody who gambles',
  'support.se.health': '1177 Swedish healthcare advice line',
  'support.se.municipal': 'Municipal carer support — search your municipality and "anhörigstöd"',
  'support.se.bris': 'Bris — for under-18s with a parent who uses (Sweden)',
  'support.us.samhsa': 'SAMHSA National Helpline — also for family members',
  'support.us.crisis': '988 Suicide & Crisis Lifeline',
  'support.gb.adfam': 'Adfam — for families affected by someone else’s drug or alcohol use',
  'support.gb.health': 'NHS 111',
  'support.generic.local': 'Carer support where you live — ask your clinic or local authority',
  'near.noRequirement':
    'Cleat never requires you to join any organisation, group or movement — neither you nor them.',

  'near.talkTitle': 'Somewhere to think out loud',
  'near.talkLede':
    'A conversation about your situation, not theirs. You can say it straight out: that you are tired, that you are angry, that you are thinking about leaving, that you do not recognise yourself any more.',
  'near.talkGreeting': 'What is heaviest right now — for you, that is?',
  'near.talkPlaceholder': 'Write what is going on with you…',
  'near.talkNotAboutThem':
    'I know nothing about the person you are describing, and I have no connection to their account. I can only go on what you tell me.',
  'near.talkNoAdviceOnLeaving':
    'Nobody here is going to tell you to stay or to go. You know more about that decision than any app does.',
  'near.talkSignIn': 'Create your own account to talk',
  'near.backToApp': 'To Cleat',
  'near.forThePersonTitle': 'Is it you who uses?',
  'near.forThePersonBody': 'Then the rest of Cleat is built for you.',

  // ---- Goal of the product ----
  'about.objective':
    "The goal isn't for you to use the app every day forever. The goal is for you to build a life where you don't need it.",
};
