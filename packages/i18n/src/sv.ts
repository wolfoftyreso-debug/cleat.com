/**
 * Swedish catalog — the source of truth.
 *
 * The English catalog is type-checked against this object, so adding a key here
 * and forgetting it there is a compile error rather than a blank screen.
 *
 * Voice rules, applied throughout:
 *  - Never shame. No "du misslyckades", no lost-progress language.
 *  - No religion, no higher power, no twelve steps.
 *  - Short in acute states, longer only where the person has room to read.
 *  - Say what to do next, not what the user should feel.
 */
export const sv = {
  // ---- Brand ----
  'app.name': 'Cleat',
  'app.tagline': 'Bygg upp ditt liv igen.',
  'app.challenger': 'Återhämtning utan predikan.',
  // The creed is used in full or not at all. Never shortened for a banner.
  'app.creed.religion': 'Ingen religion.',
  'app.creed.shame': 'Ingen skam.',
  'app.creed.judgment': 'Inget dömande.',
  'app.creed.bullshit': 'Inget skitsnack.',
  'app.creed.recovery': 'Bara återhämtning.',
  'app.subtitle': 'Ingen skam. Ingen religion. Bara återhämtning.',

  // ---- The five modes ----
  // These are the product's spine. Sub-brand names (Cleat Reset, Cleat Now,
  // Cleat Path, Cleat Patterns, Cleat Rebuild) live in marketing and support;
  // the interface shows the person's own words for what they need right now.
  'mode.reset': 'JAG HAR SUG',
  'mode.reset.sub': 'Akut hjälp när suget kommer',
  'mode.now': 'JAG KÄMPAR',
  'mode.now.sub': 'När du håller på att tappa fotfästet',
  'mode.path': 'MIN ÅTERHÄMTNING',
  'mode.path.sub': 'Din plan, din fas, ditt varför',
  'mode.patterns': 'MINA MÖNSTER',
  'mode.patterns.sub': 'Triggers, beteenden och det som återkommer',
  'mode.rebuild': 'BYGG UPP MITT LIV',
  'mode.rebuild.sub': 'Relationer, sömn, ekonomi, arbete, identitet',

  // ---- Navigation and shell ----
  'nav.home': 'Hem',
  'nav.coach': 'Coach',
  'nav.checkin': 'Incheckning',
  'nav.stats': 'Mönster',
  'nav.plan': 'Min plan',
  'nav.rebuild': 'Bygg upp',
  'nav.settings': 'Inställningar',
  // Två navigationsregioner utan namn läses upp som "navigation" två gånger.
  'nav.primaryLabel': 'Huvudnavigering',
  /*
   * Korta skärmtitlar för mobilens navigeringsfält.
   *
   * Tretton skärmar hette "Cleat". På iOS är titeln det första som läses upp
   * och det som tillbaka-knappen heter, så varje skärm sa "Cleat" och varje
   * tillbaka-knapp sa "Tillbaka till Cleat" — oavsett var man faktiskt var.
   * De långa rubrikerna på skärmarna duger inte här: "Okej. Vi tar det här
   * tillsammans." får inte plats i ett navigeringsfält.
   */
  'nav.title.craving': 'Suget',
  'nav.title.checkin': 'Incheckning',
  'nav.title.struggling': 'Just nu',
  'nav.title.crisis': 'Akut hjälp',
  'nav.title.near': 'Cleat Nära',
  'nav.title.nearTalk': 'Bollplank',
  'action.back': 'Tillbaka',
  'action.next': 'Nästa',
  'action.skip': 'Hoppa över',
  'action.save': 'Spara',
  'action.cancel': 'Avbryt',
  'action.done': 'Klar',
  'action.close': 'Stäng',
  'action.retry': 'Försök igen',
  'action.delete': 'Radera',
  'action.call': 'Ring',
  // Ett telefonnummer som länktext läses upp siffra för siffra utan att säga
  // vem man ringer. Verbet och namnet hör till den tillgängliga etiketten.
  'action.callName': 'Ring {name}',
  'action.callNumber': 'Ring {name} på {number}',
  'action.continue': 'Fortsätt',
  'common.loading': 'Laddar…',
  'common.error': 'Något gick fel. Försök igen.',
  // Ett misslyckat sparande måste säga ifrån, och säga något man kan göra
  // något åt. Skillnaden som spelar roll är "det funkar om du försöker igen"
  // mot "det gör det inte" — för det andra betyder att hämta papper och penna.
  'common.errorOffline': 'Kunde inte nå servern. Kolla uppkopplingen — det du skrev finns kvar.',
  'common.errorUnavailable': 'Vi är nere en kort stund. Försök igen om en liten stund — det du skrev finns kvar.',
  'common.errorRateLimited': 'För många försök på en gång. Vänta en stund och försök igen.',
  'common.errorValidation': 'Det gick inte igenom. Kolla vad du fyllt i.',
  'common.errorSignedOut': 'Du blev utloggad. Logga in igen för att spara det här.',
  'common.back': 'Tillbaka',
  'common.cancel': 'Avbryt',
  'common.optional': 'Frivilligt',
  'common.today': 'Idag',
  'common.day': 'Dag',
  'common.days': 'dagar',
  'common.hours': 'timmar',
  'common.minutes': 'minuter',
  'common.of': 'av',
  'common.notEnoughData': 'För lite data ännu',

  // ---- Home screen ----
  'home.dayCount': 'Dag {days}',
  'home.hoursIn': '{hours} timmar in',
  'home.sinceLastUse': 'sedan senast',
  'home.today': 'Idag',
  'home.quickActions': 'Snabbval',
  'home.personalRecord': 'Längre än du någonsin klarat',
  'home.totalInRecovery': '{days} dagar i återhämtning totalt',
  'streak.title': 'Dina dagar',
  'streak.current': 'Sedan senast',
  'streak.longest': 'Längsta hittills',
  'streak.total': 'I återhämtning totalt',
  'home.nextMilestone': 'Nästa: {milestone}',
  'milestone.nextTitle': 'Nästa milstolpe',
  'milestone.reachedTitle': 'Passerade milstolpar',
  'home.noPlanTitle': 'Du har ingen plan ännu',
  'home.noPlanBody':
    'Du behöver inte vara säker på att du ska sluta för att börja här. Vi kan börja med att bara titta på vad det kostar dig.',
  'home.startHere': 'Börja här',

  // ---- The one-tap actions ----
  'quick.craving': 'JAG HAR SUG',
  'quick.struggling': 'JAG KÄMPAR',
  'quick.talk': 'JAG BEHÖVER PRATA',
  'quick.messedUp': 'JAG TRAMPADE FEL',
  'quick.doingWell': 'DET GÅR BRA',
  'quick.todaysPlan': 'DAGENS PLAN',
  'quick.myWhy': 'MITT VARFÖR',
  'quick.callSomeone': 'RING NÅGON',
  'quick.checkIn': 'CHECKA IN',

  // ---- Craving engine ----
  'craving.title': 'Okej. Vi tar det här tillsammans.',
  'craving.step.safety': 'Först: är du i omedelbar fara?',
  'craving.step.safety.yes': 'Ja',
  'craving.step.safety.no': 'Nej',
  'craving.step.feeling': 'Vad känner du just nu?',
  'craving.step.location': 'Var är du?',
  'craving.step.intensity': 'Hur starkt är suget?',
  'craving.step.coach': 'Då gör vi så här.',
  // Ett flöde med en fråga per skärm måste säga var man är och gå att backa i.
  // Utan det blir en feltryckt chip en återvändsgränd.
  'craving.step.progress': 'Steg {step} av {total}',
  'craving.step.back': 'Tillbaka till föregående fråga',
  'craving.delay': 'Vi bestämmer ingenting på {minutes} minuter. Bara {minutes} minuter.',
  'craving.callFirst': 'Ring {name} först.',
  'craving.leaveFirst': 'Det viktigaste just nu är inte att stå emot. Det är att lämna platsen.',
  'craving.followup.what_happened_before': 'Vad hände precis innan suget kom?',
  'craving.logged': 'Loggat. Det här hjälper oss se ditt mönster.',
  'craving.howDidItGo': 'Hur gick det?',
  'craving.outcome.resisted': 'Jag stod emot',
  'craving.outcome.used': 'Jag använde',
  'craving.outcome.unknown': 'Vet inte än',

  'feeling.craving': 'Sug',
  'feeling.panic': 'Panik',
  'feeling.loneliness': 'Ensamhet',
  'feeling.anger': 'Ilska',
  'feeling.stress': 'Stress',
  'feeling.boredom': 'Tristess',
  'feeling.grief': 'Sorg',
  'feeling.pain': 'Smärta',
  'feeling.social_pressure': 'Socialt tryck',
  'feeling.other': 'Något annat',

  'location.home': 'Hemma',
  'location.work': 'På jobbet',
  'location.on_a_break': 'På rast',
  'location.after_meal': 'Efter maten',
  'location.with_coffee': 'Till kaffet',
  'location.after_drinking': 'Efter att ha druckit',
  'location.party': 'På fest',
  'location.with_users': 'Med personer som använder',
  'location.alone': 'Ensam',
  'location.in_transit': 'På väg någonstans',
  'location.other': 'Annat',

  // ---- The ten-minute protocol ----
  'protocol.title': 'Tiominutersprotokollet',
  'protocol.stop_the_decision': 'Stoppa beslutet. Du bestämmer ingenting nu.',
  'protocol.move_away_from_trigger': 'Flytta dig från det som triggade.',
  'protocol.say_out_loud': 'Säg högt vad som händer: "jag har ett sug".',
  'protocol.contact_a_person': 'Kontakta en människa. Vem som helst.',
  'protocol.water_and_body': 'Drick vatten. Ät något om du inte ätit.',
  'protocol.change_environment': 'Byt rum. Gå ut. Ändra ljuset.',
  'protocol.wait_ten_minutes': 'Vänta tio minuter. Bara tio.',
  'protocol.name_what_you_need': 'Vad behöver du egentligen just nu?',
  'protocol.do_the_alternative': 'Gör det konkreta alternativet istället.',
  'protocol.come_back': 'Kom tillbaka hit och berätta hur det gick.',

  // ---- Urge surfing ----
  'surf.title': 'Rid ut vågen',
  'surf.dont_fight': 'Försök inte slåss mot suget.',
  'surf.observe': 'Observera det istället. Var i kroppen sitter det?',
  'surf.signal_not_order': 'Det är en signal, inte en order.',
  'surf.notice_it_change': 'Lägg märke till hur det förändras medan du tittar på det.',
  'surf.nothing_to_do': 'Vi behöver inte göra någonting åt det just nu.',
  'surf.it_peaks_and_falls': 'Det stiger, toppar och sjunker. Det gör det alltid.',

  // ---- Negotiation detector ----
  'negotiation.none': '',
  'negotiation.detected':
    'Får jag säga en varsam sak, helt utan pekpinne? Det där låter lite som att beroendet självt försöker förhandla — och det är inte du, och det är inte ditt fel.',
  'negotiation.question':
    'Vill du att vi tittar på tanken en stund tillsammans, eller behöver du något annat av mig just nu?',
  'negotiation.examine': 'Undersök argumentet',
  'negotiation.act': 'Jag vill agera på det',
  'negotiation.counter.just_once':
    'Jag förstår så väl att en enda gång kan kännas som lite att begära av dig själv. Får jag bara viska en sak, med all värme: "bara en gång" brukar inte vilja stanna vid en. Du är inte dum som tänker tanken — det är beroendet som är listigt.',
  'negotiation.counter.earned_it':
    'Och du har verkligen kämpat — det är helt sant, och jag är stolt över dig. Just därför vill jag att belöningen ska vara något du är glad över imorgon också. Du förtjänar det som är snällt mot dig på riktigt.',
  'negotiation.counter.in_control_now':
    'Jag tror dig, kontrollen känns äkta just nu. Helt utan att döma säger jag bara mjukt: den känslan brukar smyga sig på precis innan. Det säger ingenting om din styrka — bara om hur beroendet fungerar.',
  'negotiation.counter.start_monday':
    'Måndag låter som en snäll idé, och jag klandrar dig verkligen inte för att vilja skjuta upp det svåra. Får jag fråga varsamt: vad skulle kännas som en lättnad om du fick vara snäll mot dig själv redan nu istället?',
  'negotiation.counter.need_it_to_sleep':
    'Sömnen är ett riktigt problem, och det tar jag på största allvar — vi ska lösa den tillsammans, du ska inte ligga vaken. Det här flyttar tyvärr bara sömnen framför dig. Får jag hjälpa dig med den på riktigt istället?',
  'negotiation.counter.need_it_to_function':
    'Jag hör hur utmattad du är, och det är helt begripligt. Du bar dig igenom dagar förut, och du är starkare än du tror. Vad är det allra minsta du skulle behöva för att bara ta dig igenom närmaste timmen — så gör vi det tillsammans?',
  'negotiation.counter.everyone_does_it':
    'Det är sant att andra kan göra saker du inte kan just nu, och det får vara orättvist och tråkigt. Men din historia är din egen och dyrbar — och du är här för att du bryr dig om den. Det gör mig varm i hjärtat.',
  'negotiation.counter.deserve_it':
    'Du förtjänar verkligen något gott — det menar jag helt uppriktigt. Låt oss bara se till att det är något som älskar dig tillbaka imorgon, inte något som gör dig ledsen. Du är värd det snälla.',
  'negotiation.counter.last_time':
    '"Sista gången" bär en historia, och jag säger det utan en gnutta förebråelse. Vad tror du att den historien viskar till dig just nu — och får jag vara kvar hos dig medan du känner efter?',
  'negotiation.counter.special_occasion':
    'Tillfället är verkligt och jag unnar dig att fira. Får jag bara påminna dig, milt: kalendern kommer alltid att erbjuda ett skäl. Du är värd ett firande som du minns med glädje imorgon.',
  'negotiation.counter.nothing_matters':
    'Åh, jag hör hur tungt allt känns just nu, och jag är så ledsen att du bär det. Att det känns meningslöst är en känsla, inte en sanning om dig — och den brukar mjukna inom några timmar. Stanna hos mig så länge.',
  'negotiation.counter.testing_myself':
    'Du behöver inte bevisa något för mig — jag tror redan på dig, precis som du är. Något i dig visste ju svaret, för du kom hit. Det är mod, och jag är stolt över dig för det.',

  // ---- Safety ----
  'mail.reset.subject': 'Återställ ditt lösenord',
  'mail.reset.body': 'Du (eller någon som skrev in din adress) bad om att återställa lösenordet till ditt Cleat-konto. Öppna länken för att välja ett nytt:',
  'mail.reset.expiry': 'Länken slutar fungera om {hours} timmar och kan bara användas en gång.',
  'mail.reset.ignore': 'Bad du inte om det här behöver du inte göra någonting. Ditt lösenord är oförändrat.',
  'mail.verify.subject': 'Bekräfta din e-postadress',
  'mail.verify.body': 'Bekräfta att adressen är din, så att du kan få tillbaka kontot om du glömmer lösenordet:',
  'mail.signature': '— Cleat',
  'safety.none': '',
  'safety.elevated':
    'Tack för att du säger hur kroppen känns — jag lyssnar, och jag är glad att du berättar. Var snäll mot dig själv och håll lite koll på symtomen, och tveka inte att söka vård om de blir värre. Du är aldrig till besvär för att du gör det.',
  'safety.urgent':
    'Jag är så glad att du berättar det här för mig, och just för att jag bryr mig om dig säger jag det ärligt och mjukt: det här är större än vad jag ensam kan bära med dig i en app. Du förtjänar en riktig människa vid din sida nu — professionell hjälp. Vill du att vi tillsammans klurar på vad du kan säga när du hör av dig till dem?',
  'safety.askDirectly':
    'Jag frågar bara för att jag bryr mig om dig, helt utan att döma: tänker du på att skada dig själv eller på att inte finnas kvar? Du behöver inte förklara någonting. Ja eller nej räcker, och jag är kvar hos dig oavsett vad du svarar.',
  'safety.emergency':
    'Jag är här hos dig, och just därför säger jag det rakt: det här är akut och för stort för en app. Ring nödnumret nu — snälla, gör det direkt. Jag släpper dig inte, och du ska inte vara ensam med det här.',
  'safety.emergencyTitle': 'Är du eller någon annan i omedelbar fara?',
  'safety.important': 'Viktigt',
  'safety.stayHere': 'Jag stannar kvar här hos dig medan du ringer. Du är inte ensam.',
  'safety.notAlone':
    'Försök att inte vara ensam just nu — du förtjänar att ha någon nära. Väck gärna någon om du behöver, det är helt okej.',
  'safety.resourcesTitle': 'Hjälp du kan ringa nu',
  'safety.helpMeSay': 'Hjälp mig formulera vad jag ska säga till vården',
  'safety.disclaimer':
    'Cleat är en coach, inte vård. Appen ersätter inte läkare, psykiatri, beroendebehandling eller akutvård.',

  'safety.detox.none': '',
  'safety.detox.alcohol':
    'Viktigt: att sluta tvärt med alkohol kan vara livsfarligt. Abstinens kan ge kramper och delirium. Prata med vården innan du slutar — de kan hjälpa dig göra det säkert.',
  'safety.detox.benzodiazepines':
    'Viktigt: att sluta tvärt med bensodiazepiner kan vara livsfarligt. Nedtrappning ska planeras med läkare. Sluta inte på egen hand.',
  'safety.detox.sedatives':
    'Viktigt: att sluta tvärt med lugnande läkemedel kan vara livsfarligt. Planera nedtrappning med läkare.',
  'safety.detox.opioids':
    'Viktigt: efter ett uppehåll sjunker toleransen snabbt. Att ta samma dos som tidigare är en vanlig orsak till dödlig överdos. Prata med vården om läkemedelsassisterad behandling.',
  'safety.detox.polysubstance':
    'Viktigt: när flera substanser är inblandade är abstinensen svårare att förutse. Gör inte det här ensam — sök vård först.',

  'resource.se.emergency': 'SOS Alarm (akut)',
  'resource.se.health': 'Vårdguiden 1177',
  'resource.se.mind': 'Mind Självmordslinjen',
  'resource.se.alcohol': 'Alkohollinjen',
  'resource.se.gambling': 'Stödlinjen för spelare',
  'resource.us.emergency': 'Emergency services',
  'resource.us.crisis': 'Suicide & Crisis Lifeline',
  'resource.us.samhsa': "SAMHSA National Helpline",
  'resource.gb.emergency': 'Emergency services',
  'resource.gb.health': 'NHS 111',
  'resource.gb.samaritans': 'Samaritans',
  'resource.generic.emergency': 'Nödnummer',
  'resource.generic.local': 'Din lokala vårdcentral eller akutmottagning',

  // When to ring which number. One line each, in the words somebody would use
  // about themselves — a list of names and digits does not help a person decide
  // who to call while they are shaking.
  'resource.se.emergency.when':
    'Livsfara, överdos, någon som inte går att väcka, krampanfall. Dygnet runt.',
  'resource.se.health.when':
    'Abstinens, kroppsliga symtom, råd om vart du ska vända dig. Dygnet runt.',
  'resource.se.mind.when': 'Tankar på att inte finnas kvar, med eller utan plan. Dygnet runt.',
  'resource.se.alcohol.when':
    'Din egen eller någon annans alkoholkonsumtion. Anonymt. Vardagar.',
  'resource.se.gambling.when':
    'Spel om pengar, för dig som spelar eller står nära någon som gör det. Vardagar.',
  'resource.us.emergency.when':
    'Livsfara, överdos, någon som inte går att väcka, krampanfall. Dygnet runt.',
  'resource.us.crisis.when': 'Tankar på att inte finnas kvar, med eller utan plan. Dygnet runt.',
  'resource.us.samhsa.when': 'Behandling och stöd vid beroende. Dygnet runt, kostnadsfritt.',
  'resource.gb.emergency.when':
    'Livsfara, överdos, någon som inte går att väcka, krampanfall. Dygnet runt.',
  'resource.gb.health.when': 'Abstinens, kroppsliga symtom, råd om vart du ska vända dig.',
  'resource.gb.samaritans.when': 'Vad som helst som är för tungt att bära själv. Dygnet runt.',
  'resource.generic.emergency.when': 'Livsfara, överdos, någon som inte går att väcka.',
  'resource.generic.local.when':
    'Slå upp numret där du är — en jourlinje som inte svarar där du står kostar samtalet.',

  // ---- The crisis page: no account, no network dependency, no trace ----
  'crisis.title': 'Nummer att ringa nu',
  'crisis.lede':
    'Du behöver inget konto och du behöver inte den här appen. Är det akut — ring nödnumret.',
  'crisis.noWordsTitle': 'Om du inte vet vad du ska säga',
  'crisis.noWordsBody':
    'Du behöver inte formulera det bra. "Jag mår inte bra och jag vet inte vem jag ska ringa" räcker för att komma vidare. Du behöver inte ha bestämt dig för någonting, och du behöver inte vara säker på att det är tillräckligt allvarligt.',
  'crisis.someoneElse':
    'Är du orolig för någon annan just nu: lämna dem inte ensamma, lägg dem i stabilt sidoläge om de är medvetslösa men andas, och ring nödnumret.',
  'crisis.detoxTitle': 'Sluta inte tvärt med allt',
  'crisis.detoxBody':
    'Att abrupt sluta med alkohol, bensodiazepiner eller andra lugnande läkemedel kan ge krampanfall och delirium, och kan vara livsfarligt. Det är den ena situationen där det du tänkte göra är farligare än att fortsätta ett dygn till medan du får tag på vård. Ring sjukvårdsrådgivningen och fråga.',
  'crisis.privacyNote':
    'Den här sidan laddar ingenting utifrån, sparar ingenting om ditt besök och fungerar utan konto.',

  // ---- Relapse / "I messed up" ----
  'relapse.title': 'Jag trampade fel',
  'relapse.opening': 'Åh, vad glad jag är att du hörde av dig. Ingen skam här, inte en gnutta — du är lika välkommen nu som alltid. Vi börjar precis här, tillsammans.',
  'relapse.continuity':
    'Din tidigare återhämtning försvann inte. Vi börjar om från den här punkten — med mer information än förra gången.',
  'relapse.safety.are_you_safe': 'Är du säker just nu?',
  'relapse.safety.dangerous_amount': 'Har du tagit något som kan innebära akut fara?',
  'relapse.safety.are_you_alone': 'Är du ensam?',
  'relapse.safety.need_medical_help': 'Behöver du medicinsk hjälp?',
  'relapse.autopsyTitle': 'Vi analyserar vad som hände',
  'relapse.autopsyIntro':
    'Det här är inte ett förhör. Vi letar efter systemfelet, inte efter något du gjorde fel.',
  'relapse.autopsy.what_happened': 'Vad hände?',
  'relapse.autopsy.when_did_it_start': 'När började processen — inte användandet, processen?',
  'relapse.autopsy.first_trigger': 'Vilken var den första triggern?',
  'relapse.autopsy.what_thought': 'Vilken tanke kom?',
  'relapse.autopsy.what_feeling': 'Vilken känsla kom?',
  'relapse.autopsy.what_decision': 'Vilket beslut togs, och när?',
  'relapse.autopsy.ignored_warnings': 'Vilka varningssignaler ignorerades?',
  'relapse.autopsy.who_was_there': 'Vilka personer fanns omkring dig?',
  'relapse.autopsy.what_could_have_broken_it': 'Vad kunde ha brutit kedjan?',
  'relapse.autopsy.what_changes_now': 'Vad ändrar vi nu?',
  'relapse.planTitle': 'Ny skyddsplan',
  'relapse.planWarnings': 'Varningssignaler att fånga tidigare',
  'relapse.planCountermeasures': 'Det här gör vi istället',
  'relapse.planNeedsWork': 'Planen är tunn ännu. Vill du fylla i den tillsammans med mig?',
  'relapse.nextHour': 'Vad gör vi under nästa timme?',

  // ---- Check-in ----
  'checkin.morning.title': 'Morgon',
  'checkin.evening.title': 'Kväll',
  // Skjutreglagets värde läses annars upp som ett naket tal utan skala.
  'scale.valueText': '{value} av 10',
  'checkin.mood': 'Hur mår du?',
  'checkin.sleep': 'Hur sov du?',
  'checkin.stress': 'Hur stressad är du?',
  'checkin.craving': 'Hur starkt är suget?',
  'checkin.biggestRisk': 'Vad är dagens största risk?',
  'checkin.keyDecision': 'Vad är dagens viktigaste beslut?',
  'checkin.wentWell': 'Vad gick bra?',
  'checkin.wasHard': 'Vad var svårt?',
  'checkin.whenCraving': 'När kom suget?',
  'checkin.whatWorked': 'Vad fungerade?',
  'checkin.learned': 'Vad lärde du dig?',
  'checkin.changeTomorrow': 'Vad behöver ändras imorgon?',
  'checkin.saved': 'Sparat.',
  'checkin.alreadyDone': 'Du har redan checkat in nu. Vill du ändra?',

  // ---- Reclaimed ----
  'reclaimed.moneyTitle': 'Pengar du tagit tillbaka',
  'reclaimed.timeTitle': 'Tid du tagit tillbaka',
  'reclaimed.framing':
    'Du har inte bara slutat spendera pengar. Du har börjat köpa tillbaka ditt liv.',
  'reclaimed.thisWeek': 'Den här veckan har du fått tillbaka {hours} timmar.',
  'reclaimed.horizon.today': 'Idag',
  'reclaimed.horizon.week': 'Vecka',
  'reclaimed.horizon.month': 'Månad',
  'reclaimed.horizon.soFar': 'Hittills',
  'reclaimed.horizon.year1': 'Om 1 år',
  'reclaimed.horizon.year5': 'Om 5 år',
  'reclaimed.projection': 'Om du fortsätter',

  // ---- Units ----
  'unit.alcohol': 'standardglas',
  'unit.nicotine': 'cigarett/prilla',
  'unit.nicotine.smoked': 'cigarett',
  'unit.nicotine.oral': 'prilla',
  'purchase.can': 'dosa',
  'unit.dose': 'dos',
  'unit.session': 'tillfälle',

  // ---- Substances ----
  'substance.alcohol': 'Alkohol',
  'substance.nicotine': 'Nikotin',
  'substance.cannabis': 'Cannabis',
  'substance.opioids': 'Opioider',
  'substance.stimulants': 'Stimulantia',
  'substance.benzodiazepines': 'Bensodiazepiner',
  'substance.sedatives': 'Lugnande läkemedel',
  'substance.polysubstance': 'Flera substanser',
  'substance.gambling': 'Spel om pengar',
  'substance.other_behaviour': 'Annat tvångsmässigt beteende',

  // ---- Milestones ----
  'milestone.shared.day1': 'Ett dygn. Det svåraste dygnet är det första.',
  'milestone.shared.day3': 'Tre dagar. Kroppen har börjat ställa om.',
  'milestone.shared.week1': 'En vecka. Du har bevisat att det går att göra en dag i taget.',
  'milestone.shared.week2': 'Två veckor. Sömn och humör brukar börja stabilisera sig här.',
  'milestone.shared.month1': 'En månad. Rutiner börjar bära dig istället för tvärtom.',
  'milestone.shared.month3': 'Tre månader. Många beskriver att hjärnan känns klarare nu.',
  'milestone.shared.month6': 'Ett halvår. Det här är inte längre ett experiment.',
  'milestone.shared.year1': 'Ett år. Du är en person som lever så här nu.',

  'milestone.alcohol.h12': '12 timmar. Blodsockret börjar stabilisera sig.',
  'milestone.alcohol.h72': '72 timmar. Den akuta abstinensen brukar ha passerat sin topp.',
  'milestone.alcohol.week1': 'En vecka. Sömnen brukar bli djupare, även om den är rörig först.',
  'milestone.alcohol.month1': 'En månad. Många märker bättre hud, sömn och energi här.',
  'milestone.alcohol.month3': 'Tre månader. Levern har fått ordentlig tid att återhämta sig.',
  'milestone.alcohol.year1': 'Ett år utan alkohol. Ett helt varv av årstider, helger och kriser.',

  'milestone.source': 'Källa: {source}',
  'milestone.nicotine.min20': '20 minuter. Pulsen börjar gå ner mot det normala, och kolmonoxiden i blodet har halverats.',
  'milestone.nicotine.h12': '12 timmar. Kolmonoxiden i blodet är nere på normal nivå.',
  'milestone.nicotine.h24': 'Ett dygn. Nikotinet är i praktiken ur blodet. Det är också ungefär nu det brukar vara som tyngst — det betyder inte att något gått fel.',
  'milestone.nicotine.h48': '48 timmar. Kolmonoxiden är nere på samma nivå som hos någon som aldrig rökt. Lukt och smak börjar komma tillbaka.',
  'milestone.nicotine.h72': 'Tre dygn. Det brukar vara ungefär här abstinensen toppar. Härifrån går det oftast åt rätt håll.',
  'milestone.nicotine.week3': 'Tre veckor. Abstinensbesvären brukar ha släppt vid det här laget — sömnen, irritationen, koncentrationen.',
  'milestone.nicotine.week2': 'Två veckor. Risken för hjärtinfarkt har börjat sjunka, och hostan börjar ge med sig.',
  'milestone.nicotine.month1': 'En månad. Andningen är lättare och orken räcker längre än den gjorde.',
  'milestone.nicotine.week12': 'Tolv veckor. Blodcirkulationen har blivit bättre och lungfunktionen har ökat med upp till tio procent.',
  'milestone.nicotine.year1': 'Ett år. Risken för hjärtinfarkt är halverad jämfört med någon som fortsatt röka. Risken att dö i lungcancer är också halverad.',
  'milestone.nicotine.year5': 'Fem år. Risken för stroke närmar sig den hos någon som aldrig rökt.',
  'milestone.nicotine.year15': 'Femton år. Risken för kranskärlssjukdom är tillbaka på samma nivå som hos någon som aldrig rökt.',

  'milestone.opioids.h12': '12 timmar. Det värsta ligger framför, men det är avgränsat.',
  'milestone.opioids.h72': '72 timmar. Den akuta abstinensen brukar toppa här.',
  'milestone.opioids.week1':
    'En vecka. Kom ihåg: toleransen är låg nu. En gammal dos är farlig.',
  'milestone.opioids.month1': 'En månad. Sömn och aptit börjar hitta tillbaka.',
  'milestone.opioids.month3': 'Tre månader. Många beskriver att grundstämningen lyfter här.',

  'milestone.stimulants.h72': '72 timmar. Kraschen är oftast som värst nu — den går över.',
  'milestone.stimulants.week1': 'En vecka. Sömnen brukar börja komma tillbaka.',
  'milestone.stimulants.month1': 'En månad. Att inget känns roligt är abstinens, inte ditt liv.',
  'milestone.stimulants.month3': 'Tre månader. Glädje i vanliga saker brukar återvända här.',

  'milestone.cannabis.h72': '72 timmar. Sömnsvårigheter och irritation brukar toppa nu.',
  'milestone.cannabis.week2': 'Två veckor. Drömmarna lugnar sig, sömnen blir mer normal.',
  'milestone.cannabis.month1': 'En månad. Många märker skarpare minne och motivation.',
  'milestone.cannabis.month3': 'Tre månader. Ångestnivån brukar ha lagt sig.',

  'milestone.gambling.h72': '72 timmar. De starkaste impulserna brukar komma i vågor nu.',
  'milestone.gambling.week2': 'Två veckor. Suget kommer glesare när mönstret bryts.',
  'milestone.gambling.month1': 'En månad. Ekonomin börjar gå att överblicka.',
  'milestone.gambling.month3': 'Tre månader. Du har haft tid att göra upp en riktig plan.',

  // ---- Phases ----
  'phase.insight': 'Insikt',
  'phase.decision': 'Beslut',
  'phase.preparation': 'Förberedelse',
  'phase.day_zero': 'Dag noll',
  'phase.acute': 'Akut fas',
  'phase.stabilization': 'Stabilisering',
  'phase.identity': 'Identitet',
  'phase.relapse_prevention': 'Återfallsprevention',
  'phase.reason.no_active_plan': 'Du har ingen aktiv plan ännu.',
  'phase.reason.day_zero': 'Du har precis börjat. Vi tittar bara på de närmaste timmarna.',
  'phase.reason.acute_window': 'Du är i den akuta fasen. Målet är att ta dig igenom dygnet.',
  'phase.reason.building_stability': 'Du bygger stabilitet i vardagen.',
  'phase.reason.identity_rebuild': 'Du bygger ett liv, inte bara ett uppehåll.',
  'phase.reason.long_term': 'Du är långt in. Nu handlar det om att skydda det du byggt.',

  'focus.map_the_cost': 'Kartlägg vad det faktiskt kostar dig',
  'focus.name_the_pattern': 'Sätt ord på mönstret',
  'focus.what_changed_now': 'Vad har fått dig att fundera på det här nu?',
  'focus.write_my_why': 'Formulera ditt varför',
  'focus.what_i_want_back': 'Vad vill du få tillbaka?',
  'focus.readiness_scale': 'Hur redo är du, på en skala 1–10?',
  'focus.trigger_map': 'Gör din triggerkarta',
  'focus.remove_access': 'Ta bort tillgången',
  'focus.support_network': 'Vem vet om det här?',
  'focus.next_ten_minutes': 'De närmaste tio minuterna',
  'focus.tonight_plan': 'Plan för ikväll',
  'focus.who_to_call': 'Vem ringer du om det blir svårt?',
  'focus.get_through_today': 'Ta dig igenom idag',
  'focus.sleep_and_food': 'Sömn och mat',
  'focus.craving_protocol': 'Ha protokollet redo',
  'focus.daily_routine': 'Bygg en rutin som håller',
  'focus.money_and_work': 'Ekonomi och arbete',
  'focus.people_and_places': 'Människor och platser',
  'focus.who_am_i_now': 'Vem är jag utan beroendet?',
  'focus.rebuild_relationships': 'Reparera relationer',
  'focus.meaningful_activity': 'Något som betyder något',
  'focus.warning_signs': 'Känn igen dina varningssignaler',
  'focus.protection_plan': 'Håll skyddsplanen levande',
  'focus.keep_the_network': 'Tappa inte nätverket',

  // ---- Recovery indicators ----
  'indicator.title': 'Dina indikatorer',
  'indicator.explainer':
    'Det finns ingen totalpoäng här. Återhämtning är inte ett datorspel — det här är sju separata trender du kan göra något åt.',
  'indicator.stability': 'Stabilitet',
  'indicator.stability.desc': 'Hur stabil vardagen är just nu.',
  'indicator.craving_control': 'Sugkontroll',
  'indicator.craving_control.desc': 'Hur du hanterar sug när de kommer.',
  'indicator.routine': 'Rutin',
  'indicator.routine.desc': 'Hur stabila dina rutiner är.',
  'indicator.connection': 'Kontakt',
  'indicator.connection.desc': 'Kontakt med människor.',
  'indicator.purpose': 'Mening',
  'indicator.purpose.desc': 'Meningsfull aktivitet och riktning.',
  'indicator.self_trust': 'Självtillit',
  'indicator.self_trust.desc': 'Förmågan att hålla dina egna beslut.',
  'indicator.risk': 'Risk',
  'indicator.risk.desc': 'Aktuell återfallsrisk. Här är lägre bättre.',
  'indicator.trend.up': 'Uppåt',
  'indicator.trend.down': 'Nedåt',
  'indicator.trend.flat': 'Stabil',
  'indicator.trend.unknown': 'Ingen trend ännu',
  'indicator.confidence.low': 'Bygger på lite data',
  'indicator.confidence.medium': 'Bygger på en del data',
  'indicator.confidence.high': 'Bygger på mycket data',
  'indicator.samples': 'Baserat på {count} observationer',

  // ---- Insights ----
  'insight.title': 'Ditt mönster',
  'insight.subtitle': 'Det här är vad din egen data säger. Stämmer det?',
  'insight.time_of_day': 'Dina sug kommer oftast {period} — {percent}% av dem.',
  'insight.weekday': 'Dina sug samlas på {weekday} — {percent}% av dem.',
  'insight.trigger': '"{trigger}" har utlöst sug {count} gånger.',
  'insight.location': '{percent}% av dina sug har kommit {location}.',
  'insight.sleep':
    'Efter dåliga nätter är dina sug i snitt {delta} steg starkare. Det bygger på {poorNights} tillfällen.',
  'insight.stress':
    'På stressiga dagar är dina sug i snitt {delta} steg starkare. Det bygger på {highDays} tillfällen.',
  'insight.what_works': '"{action}" har fungerat för dig {count} gånger.',
  'insight.period.night': 'på natten',
  'insight.period.morning': 'på morgonen',
  'insight.period.afternoon': 'på eftermiddagen',
  'insight.period.evening': 'på kvällen',
  'insight.weekday.0': 'söndagar',
  'insight.weekday.1': 'måndagar',
  'insight.weekday.2': 'tisdagar',
  'insight.weekday.3': 'onsdagar',
  'insight.weekday.4': 'torsdagar',
  'insight.weekday.5': 'fredagar',
  'insight.weekday.6': 'lördagar',
  'insight.location.home': 'hemma',
  'insight.location.work': 'på jobbet',
  'insight.location.party': 'på fest',
  'insight.location.with_users': 'med personer som använder',
  'insight.location.alone': 'när du varit ensam',
  'insight.location.in_transit': 'på väg någonstans',
  'insight.location.other': 'på andra platser',

  // ---- Mantras ----
  'mantra.craving_is_not_command': 'Ett sug är inte en order.',
  'mantra.thought_is_not_decision': 'En tanke är inte ett beslut.',
  'mantra.delay_the_decision': 'Skjut upp beslutet.',
  'mantra.change_the_environment': 'Byt miljö.',
  'mantra.tell_someone': 'Berätta för någon.',
  'mantra.one_good_decision': 'Ett bra beslut i taget.',
  'mantra.relapse_is_information': 'Ett återfall är information.',
  'mantra.shame_feeds_the_cycle': 'Skam göder cykeln.',
  'mantra.you_are_not_your_addiction': 'Du är inte ditt beroende.',
  'mantra.your_next_decision_matters': 'Ditt nästa beslut spelar roll.',
  'mantra.dontHaveToWin': 'Du behöver inte vinna resten av livet idag.',
  'mantra.tenMinutes': 'Okej. Då tar vi bara nästa tio minuter.',

  // ---- Toolbox ----
  'toolbox.title': 'Verktygslåda',
  'toolbox.category.acute': 'Akut',
  'toolbox.category.cognitive': 'Tankar',
  'toolbox.category.behavioural': 'Beteende',
  'toolbox.category.social': 'Socialt',
  'toolbox.category.life': 'Livsbygge',
  'toolbox.minutes': '{minutes} min',

  'tool.delay_10_minutes': 'Vänta tio minuter',
  'tool.change_environment': 'Byt miljö',
  'tool.call_someone': 'Ring någon',
  'tool.urge_surfing': 'Rid ut vågen',
  'tool.grounding_54321': 'Grundning 5-4-3-2-1',
  'tool.slow_breathing': 'Långsam andning',
  'tool.drink_water_eat': 'Vatten och mat',
  'tool.move_your_body': 'Rör på kroppen',
  'tool.remove_the_trigger': 'Ta bort triggern',
  'tool.cold_water': 'Kallt vatten i ansiktet',
  'tool.leave_the_situation': 'Lämna situationen',
  'tool.name_the_negotiation': 'Sätt namn på förhandlingen',
  'tool.play_the_tape_forward': 'Spola filmen framåt',
  'tool.read_my_why': 'Läs ditt varför',
  'tool.decisional_balance': 'Väg för och emot',
  'tool.challenge_the_thought': 'Ifrågasätt tanken',
  'tool.reframe': 'Formulera om',
  'tool.implementation_intention': 'Om–så-plan',
  'tool.habit_replacement': 'Byt ut vanan',
  'tool.design_the_evening': 'Designa kvällen',
  'tool.reward_substitution': 'Byt belöning',
  'tool.schedule_the_day': 'Lägg upp dagen',
  'tool.block_access': 'Blockera tillgången',
  'tool.contact_trusted_person': 'Kontakta någon du litar på',
  'tool.peer_support': 'Träffa andra i återhämtning',
  'tool.book_professional': 'Boka professionell hjälp',
  'tool.tell_someone_today': 'Berätta för någon idag',
  'tool.sleep_routine': 'Sömnrutin',
  'tool.exercise': 'Träning',
  'tool.money_plan': 'Plan för ekonomin',
  'tool.work_next_step': 'Nästa steg med jobbet',
  'tool.repair_a_relationship': 'Reparera en relation',
  'tool.do_something_you_like': 'Gör något du faktiskt gillar',

  // ---- Trigger map ----
  'trigger.title': 'Min triggerkarta',
  'trigger.intro':
    'Ett sug känns som en enda händelse. Det är det inte — det är en kedja. När du ser leden skrivna slutar den kännas oundviklig.',
  'trigger.step.trigger': 'Trigger',
  'trigger.step.thought': 'Tanke',
  'trigger.step.feeling': 'Känsla',
  'trigger.step.impulse': 'Impuls',
  'trigger.step.action': 'Handling',
  'trigger.step.consequence': 'Konsekvens',
  'trigger.add': 'Lägg till en trigger',
  'trigger.label': 'Vad är triggern?',
  'trigger.empty': 'Du har inte kartlagt någon trigger ännu.',
  'trigger.whereToBreak': 'Var kan du bryta kedjan?',

  // ---- Cleat Now: I'm struggling ----
  'now.intro':
    'Det här är inte akut ännu. Det är timmen innan — den som faktiskt avgör. Vi ändrar något billigt nu istället för något dyrt sen.',
  'now.whatIsHappening': 'Vad är det som händer?',
  'now.iAm': 'Jag känner',
  'now.cheapest': 'Det billigaste som brukar funka',
  'now.ifItGetsWorse': 'Om det växer till ett riktigt sug:',

  // ---- Toolbox filters ----
  'toolbox.all': 'Allt',
  'toolbox.quickOnly': 'Går snabbt',

  // ---- Offline ----
  // The craving flow must open with no network. These strings are what the
  // person sees when it does.
  'offline.banner': 'Ingen uppkoppling — men det du behöver finns här ändå.',
  'offline.planSource': 'Planen kommer från din telefon, inte från servern.',
  'offline.queued': 'Loggat lokalt. Skickas när du är online igen.',
  'offline.notLogged': 'Kunde inte spara det just nu. Stunden räknas ändå.',
  'offline.noKit':
    'Vi har inte hunnit spara dina uppgifter offline än. Protokollet nedan fungerar ändå.',
  'offline.title': 'Du är offline',
  'offline.body':
    'Tiominutersprotokollet, verktygen och ditt varför fungerar utan uppkoppling. Öppna "Jag har sug" så vanligt.',

  // ---- Rebuild my life ----
  // SAMHSA describes recovery through health, home, purpose and community. These
  // domains follow that structure with entirely secular language.
  'rebuild.title': 'Bygg upp mitt liv',
  'rebuild.intro':
    'Det här är den större delen. Att sluta är början — det här är det som gör att du inte behöver börja om.',
  'rebuild.domain.health': 'Hälsa',
  'rebuild.domain.health.desc': 'Sömn, mat, kropp, vård du skjutit upp.',
  'rebuild.domain.sleep': 'Sömn',
  'rebuild.domain.sleep.desc': 'Den enskilt största hävstången på ditt sug.',
  'rebuild.domain.relationships': 'Relationer',
  'rebuild.domain.relationships.desc': 'Vem har påverkats? Vad behöver erkännas?',
  'rebuild.domain.money': 'Ekonomi',
  'rebuild.domain.money.desc': 'Överblick, skulder, en plan som går att följa.',
  'rebuild.domain.work': 'Arbete',
  'rebuild.domain.work.desc': 'Struktur, mening, försörjning.',
  'rebuild.domain.exercise': 'Träning',
  'rebuild.domain.exercise.desc': 'Rörelse som reglerar stress, inte som prestation.',
  'rebuild.domain.social': 'Socialt liv',
  'rebuild.domain.social.desc': 'Människor och platser — vilka bär, vilka drar ner?',
  'rebuild.domain.home': 'Boende',
  'rebuild.domain.home.desc': 'En trygg plats att vara på.',
  'rebuild.domain.identity': 'Identitet',
  'rebuild.domain.identity.desc': 'Vem är jag utan beroendet?',
  'rebuild.domain.purpose': 'Mening',
  'rebuild.domain.purpose.desc': 'Något som betyder något. Framtidsplaner.',
  'rebuild.status.untouched': 'Inte påbörjat',
  'rebuild.status.working': 'Pågår',
  'rebuild.status.steady': 'Stabilt',
  'rebuild.pickOne': 'Välj ett område. Inte alla. Ett.',
  'rebuild.lockedTitle': 'Kommer senare',
  'rebuild.lockedBody':
    'Ingenting hålls undan från dig — det här är bara inte realistiskt att jobba med än. Vi öppnar upp det när vardagen bär.',
  'rebuild.relationships.q1': 'Vem har påverkats?',
  'rebuild.relationships.q2': 'Vad behöver erkännas?',
  'rebuild.relationships.q3': 'Vilket löfte kan du faktiskt hålla?',
  'rebuild.relationships.q4': 'Vad behöver du sluta lova?',
  'rebuild.relationships.lesson': 'Handling väger tyngre än löfte.',

  'rebuild.reason.sleep_evidence':
    'Din egen data pekar hit: sömnen har varit dålig flera nätter, och dina sug följer den.',
  'rebuild.reason.connection_low': 'Kontakten med människor är tunn just nu. Det är den som brister först.',
  'rebuild.reason.stability_low': 'Vardagen är skakig. Vi börjar med grunderna.',
  'rebuild.reason.default': 'Det här är nästa sak som bär mest.',

  // ---- My why / future self ----
  'why.title': 'Mitt varför',
  'why.prompt': 'Vad vill du få tillbaka?',
  'why.questions.cost': 'Vad har beroendet kostat dig?',
  'why.questions.who': 'Vem vill du vara?',
  'why.questions.year': 'Vad vill du kunna göra om ett år?',
  'why.questions.nothing': 'Vad händer om ingenting förändras?',
  'why.empty': 'Du har inte skrivit ditt varför ännu. Det är det som bär när det blir svårt.',
  'why.write': 'Skriv ditt varför',
  'future.title': 'Framtida jag',
  'future.30': 'Om 30 dagar',
  'future.90': 'Om 90 dagar',
  'future.1y': 'Om 1 år',
  'future.5y': 'Om 5 år',
  'future.letter': 'Brev från ditt framtida jag',

  // ---- Support network ----
  'support.title': 'Mitt nätverk',
  'support.empty': 'Du har ingen i listan ännu. Även ett namn gör skillnad klockan två på natten.',
  'support.add': 'Lägg till person',
  'support.name': 'Namn',
  'support.relation': 'Relation',
  'support.phone': 'Telefon',
  'support.primary': 'Ring den här först',
  'support.noRequirement':
    'Cleat kräver aldrig att du går med i någon organisation, grupp eller rörelse.',

  // ---- Coach ----
  'coach.title': 'Coach',
  'coach.placeholder': 'Skriv vad som händer…',
  'coach.send': 'Skicka',
  'coach.thinking': 'Tänker…',
  'coach.offline':
    'Jag är inte riktigt uppkopplad just nu, men jag är ändå här hos dig och alla verktygen funkar. Vill du att vi går igenom tiominuterna tillsammans?',
  'coach.greeting.day_zero': 'Du har börjat — vet du hur stort det är? Jag är så glad att du är här. Vi tar bara de närmaste tio minuterna, tillsammans.',
  'coach.greeting.acute': 'Jag är hos dig. Hur är det precis just nu — inte hela dagen, bara det här ögonblicket?',
  'coach.greeting.stabilization': 'Så fint att du hör av dig. Vad har varit tyngst den här veckan? Vi bär det tillsammans.',
  'coach.greeting.identity': 'Jag är stolt över var du är. Vad drömmer du om att bygga härnäst?',
  'coach.greeting.default': 'Hej, vad fint att du är här. Vad snurrar i dig just nu?',
  'coach.notATherapist':
    'Jag är din coach och jag bryr mig verkligt om dig — men jag är inte din läkare, inte din terapeut, och absolut inte din domare.',

  // ---- Auth and onboarding ----
  'auth.signIn': 'Logga in',
  'auth.signUp': 'Skapa konto',
  'auth.signOut': 'Logga ut',
  'auth.email': 'E-post',
  'auth.password': 'Lösenord',
  'auth.displayName': 'Vad ska jag kalla dig?',
  'auth.haveAccount': 'Har du redan ett konto?',
  'auth.noAccount': 'Inget konto ännu?',
  'auth.invalid': 'Fel e-post eller lösenord.',
  'auth.weakPassword': 'Lösenordet måste vara minst 12 tecken.',
  'auth.emailTaken': 'Det finns redan ett konto med den e-posten.',
  'auth.forgotPassword': 'Glömt lösenordet?',
  'auth.forgotTitle': 'Återställ lösenordet',
  'auth.forgotBody':
    'Skriv adressen du använde. Vi skickar en länk dit som gäller i två timmar och bara går att använda en gång.',
  'auth.forgotSend': 'Skicka länken',
  // Deliberately the same answer whether or not kontot finns. Vem som har ett
  // konto här är i sig känsligt.
  'auth.forgotSent':
    'Finns det ett konto med den adressen är ett mejl på väg. Titta i skräpposten också.',
  'auth.backToSignIn': 'Tillbaka till inloggningen',
  'auth.resetTitle': 'Välj ett nytt lösenord',
  'auth.resetBody':
    'När du sparar loggas alla enheter ut, även den du sitter vid. Det är meningen: om någon annan varit inne i kontot ska de inte vara kvar.',
  'auth.resetNewPassword': 'Nytt lösenord',
  'auth.resetSave': 'Spara och logga in',
  'auth.resetDone': 'Klart. Logga in med det nya lösenordet.',
  'auth.resetInvalid': 'Länken är förbrukad eller för gammal. Begär en ny.',
  'auth.resetNoToken': 'Länken saknar sin nyckel. Öppna den direkt från mejlet.',
  'auth.verifyTitle': 'Bekräfta din e-postadress',
  'auth.verifyWorking': 'Ett ögonblick.',
  'auth.verifyDone': 'Tack — adressen är bekräftad. Nu kan du få tillbaka kontot om du glömmer lösenordet.',
  'auth.verifyInvalid': 'Länken är förbrukad eller för gammal.',
  'auth.forgotMobileHint':
    'Länken öppnas i webbläsaren. Kom tillbaka hit och logga in när du valt ett nytt lösenord.',

  // Tvåstegsinloggning. Tonen spelar roll: det här är ett lås på det mest
  // privata de flesta någonsin skriver ner, och skälet att slå på det är
  // konkret — inte "god praxis", utan den bestämda person som annars kan läsa.
  'auth.totpTitle': 'Tvåstegsinloggning',
  'auth.totpOn': 'På',
  'auth.totpOffBody':
    'Ett lösenord kan gissas, återanvändas eller redan vara känt av någon du bor med. Med det här på krävs också en kod från din telefon.',
  'auth.totpEnable': 'Slå på tvåstegsinloggning',
  'auth.totpSetupBody':
    'Lägg in nyckeln i en autentiseringsapp och skriv sedan den sexsiffriga koden den ger dig. Ingenting ändras förrän koden godtas, så en felskriven nyckel kan inte låsa ute dig.',
  'auth.totpSecretLabel': 'Din nyckel',
  'auth.totpCode': 'Kod',
  'auth.totpConfirm': 'Bekräfta och slå på',
  'auth.totpWrongCode': 'Koden stämde inte. Kolla klockan i telefonen och testa nästa.',
  'auth.totpNotStarted': 'Börja om — den uppsättningen är inte öppen längre.',
  'auth.totpAlreadyOn': 'Tvåstegsinloggning är redan på.',
  'auth.totpDisable': 'Stäng av tvåstegsinloggning',
  'auth.totpDisablePassword': 'Ditt lösenord',
  'auth.totpCodesLeft': '{count} återställningskoder kvar',
  'auth.totpRecoveryTitle': 'Spara de här återställningskoderna',
  'auth.totpRecoveryBody':
    'Varje kod loggar in dig en gång om du blir av med telefonen. Det här är enda gången de visas. Utan dem betyder en förlorad telefon ett förlorat konto — och allt du skrivit i det.',
  'auth.totpRecoveryDownload': 'Ladda ner som fil',
  'auth.totpRecoverySaved': 'Jag har sparat dem',
  'auth.totpPrompt': 'Skriv koden från din autentiseringsapp.',
  'auth.totpRecoveryHint': 'Borta telefon? Använd en av dina återställningskoder i stället.',
  'auth.totpChallengeExpired': 'Det tog för lång tid, eller för många fel koder. Logga in igen.',
  'onboarding.welcome': 'Välkommen till Cleat',
  'onboarding.intro':
    'Det här är inte ett program du ska klara av. Det är ett verktyg för att ta nästa bra beslut.',
  'onboarding.pickSubstance': 'Vad vill du lämna?',
  'onboarding.intakeForm': 'Röker du eller snusar du?',
  'onboarding.intakeForm.hint': 'Vi frågar för att tidslinjen om lungor och kolmonoxid bara gäller den som rökt. Vi vill inte påstå saker om din kropp som inte stämmer.',
  'intake.smoked': 'Röker',
  'intake.oral': 'Snusar',
  'intake.both': 'Både och',
  'onboarding.usage': 'Hur mycket brukade det bli?',
  'onboarding.unitsPerDay': 'Hur många {unit} per dag?',
  'onboarding.purchaseCost': 'Vad kostar ett {purchase}?',
  'onboarding.purchaseSize': 'Hur många i ett {purchase}?',
  'purchase.pack': 'paket',
  'onboarding.cost': 'Ungefär vad kostar en {unit}?',
  'onboarding.startDate': 'När slutade du — eller när tänker du sluta?',
  'onboarding.notReadyYet': 'Jag har inte slutat än',
  'onboarding.done': 'Klart. Vi börjar där du är.',

  // ---- Settings and privacy ----
  'settings.title': 'Inställningar',
  'settings.language': 'Språk',
  'settings.language.sv': 'Svenska',
  'settings.language.en': 'English',
  'settings.country': 'Land (för rätt nödnummer)',
  'settings.timezone': 'Tidszon',
  'privacy.title': 'Dina uppgifter',
  'privacy.whatWeKnow': 'Vad vet appen?',
  'privacy.whyWeKnow': 'Varför vet den det?',
  'privacy.whoSees': 'Vem kan se det?',
  'privacy.principles':
    'Uppgifter om återhämtning är extremt känsliga. Vi minimerar insamlingen, säljer aldrig dina data, bygger inga annonsprofiler och delar ingenting med försäkringsbolag eller arbetsgivare.',
  'privacy.storedTitle': 'Det här ligger sparat om dig',
  'privacy.category.account': 'Konto (e-post, namn, språk)',
  'privacy.category.profile': 'Ditt varför',
  'privacy.category.quitPlan': 'Din plan',
  'privacy.category.relapses': 'Återfall du loggat',
  'privacy.category.checkIns': 'Incheckningar',
  'privacy.category.cravings': 'Sug du loggat',
  'privacy.category.supportContacts': 'Stödkontakter',
  'privacy.sharingTitle': 'Vad som händer med det',
  'privacy.sharing.soldToThirdParties': 'Säljs till någon annan',
  'privacy.sharing.usedForAdvertising': 'Används för annonsprofiler',
  'privacy.sharing.sharedWithInsurers': 'Delas med försäkringsbolag',
  'privacy.sharing.sharedWithEmployers': 'Delas med arbetsgivare',
  'privacy.sharing.no': 'Nej',
  'privacy.sharing.yes': 'Ja — fråga den som driver den här installationen varför',
  'privacy.export': 'Exportera allt jag har',
  'privacy.exportDone': 'Export klar.',
  'privacy.delete': 'Radera mitt konto och all data',
  'privacy.deleteConfirm':
    'Det här raderar allt permanent och går inte att ångra. Skriv RADERA för att bekräfta.',
  'privacy.deleteWord': 'RADERA',
  'privacy.deletePassword': 'Ditt lösenord',
  'privacy.deletePasswordWhy':
    'Vi frågar efter lösenordet också. Ett bekräftelseord stoppar en olyckshändelse — bara lösenordet stoppar någon annan som fått tag i din olåsta telefon.',
  'privacy.deleteWrongPassword': 'Fel lösenord. Ingenting har raderats.',
  'privacy.deleted': 'Allt är raderat. Ta hand om dig.',
  'privacy.exportShare': 'Dela eller spara exporten',
  'privacy.exportLarge':
    'Exporten är stor ({kilobytes} kB). Vissa appar kortar av lång text — öppna webbversionen om du vill ha den som fil.',

  // ---- Cleat Nära — för dig som står bredvid ----
  'near.title': 'För dig som står bredvid',
  'near.tagline': 'Du är inte anledningen, och du är inte lösningen. Men du lever mitt i det.',
  'near.intro':
    'Det här är för dig som är anhörig, partner, förälder, barn eller vän till någon som använder. Det är inte kopplat till hens konto och visar ingenting om hen. Det finns för att du ska förstå vad som faktiskt händer, och för att du också ska finnas kvar när det här är över.',
  'near.noAccountNeeded': 'Du behöver inget konto för att läsa det här, och besöket sparas ingenstans.',

  'near.emergencyTitle': 'När det inte är ett samtal längre',
  'near.emergencyLede':
    'Ring nödnumret först och läs resten sedan. Det här är inte situationer att lösa själv.',
  'near.sign.unresponsive': 'Går inte att väcka, eller vaknar bara till för en sekund.',
  'near.sign.seizure': 'Kramper, skakningar som inte går att stoppa, stelhet.',
  'near.sign.breathing': 'Långsam, rosslig eller oregelbunden andning. Blå läppar eller fingrar.',
  'near.sign.confusion': 'Ser eller hör saker som inte finns, vet inte var hen är, kraftig förvirring.',
  'near.sign.talking_about_dying': 'Pratar om att inte vilja finnas kvar, eller tar farväl.',
  'near.sign.alcohol_or_benzo_withdrawal':
    'Slutar tvärt med alkohol eller lugnande läkemedel och blir skakig, svettig, förvirrad — abstinensen i sig kan vara livsfarlig.',
  'near.recoveryPosition':
    'Är hen medvetslös men andas: lägg hen i stabilt sidoläge och stanna kvar tills hjälpen kommer.',

  'near.understandTitle': 'Vad som faktiskt händer',
  'near.topic.what_a_craving_is': 'Ett sug är inte ett sug efter något gott',
  'near.topic.what_a_craving_is.body':
    'Det liknar mer törst eller panik än lust. Kroppen larmar om att något är fel och pekar på en enda lösning. Det går över — de flesta sug kulminerar inom tjugo minuter — men medan det pågår är det svårt att tänka på något annat. Det är därför tio minuter kan vara skillnaden, och därför "kan du inte bara låta bli" landar som en fråga från en annan planet.',
  'near.topic.the_negotiation_voice': 'Rösten som förhandlar',
  'near.topic.the_negotiation_voice.body':
    '"Bara en gång." "Jag har varit duktig." "Jag börjar på måndag." "Jag behöver det för att sova." Det låter som beslut och det är det inte — det är beroendet som argumenterar, och det är ofta väldigt övertygande. När du hör det pratar du inte med hela människan. Det är inte samma sak som att hen ljuger för dig med flit.',
  'near.topic.why_willpower_framing_fails': 'Varför "skärp dig" inte fungerar',
  'near.topic.why_willpower_framing_fails.body':
    'Det handlar inte om att hen bryr sig för lite om dig. Beroendet ändrar hur hjärnan värderar saker just i stunden, inte hur mycket hen älskar sina barn. Att förklara konsekvenserna en gång till löser inte något som inte handlar om okunskap — hen vet redan. Skam gör det dessutom mätbart värre: det är en av de vanligaste vägarna tillbaka till användandet.',
  'near.topic.why_they_lie': 'Varför du blir ljugen för',
  'near.topic.why_they_lie.body':
    'Nästan alltid för att slippa skammen och för att slippa samtalet, sällan för att lura just dig. Det gör inte lögnen okej och du behöver inte acceptera den. Men om du vet varför den kommer blir det lättare att svara på den utan att hela kvällen blir ett förhör.',
  'near.topic.withdrawal_can_be_dangerous': 'Att sluta tvärt kan vara farligt',
  'near.topic.withdrawal_can_be_dangerous.body':
    'Alkohol, bensodiazepiner och andra lugnande läkemedel kan ge kramper och delirium när de sätts ut abrupt, och det kan vara livshotande. Efter ett uppehåll från opioider sjunker toleransen — den gamla dosen kan då räcka för en dödlig överdos, vilket är varför återfall efter en tid nykter är särskilt farligt. Pressa aldrig fram en tvärstopp på egen hand. Ring 1177 och fråga.',
  'near.topic.relapse_is_not_a_moral_failure': 'Ett återfall är inte att allt var förgäves',
  'near.topic.relapse_is_not_a_moral_failure.body':
    'Återfall är vanligt i återhämtning, ungefär som det är i andra kroniska tillstånd. Det raderar inte månaderna innan — de finns kvar som erfarenhet, som veta-hur, som bevis på att det går. Det som avgör är oftast hur snabbt någon kommer tillbaka, inte att det hände.',
  'near.topic.what_actually_helps': 'Det som faktiskt hjälper',
  'near.topic.what_actually_helps.body':
    'Att vara förutsägbar. Att säga vad du själv gör, inte vad hen måste göra. Att fortsätta bjuda in hen till livet utanför beroendet. Att prata om något annat ibland. Att svara lugnt när hen berättar något svårt, så att det går att berätta nästa gång också. Att skilja på personen och beteendet, högt.',
  'near.topic.what_does_not_help': 'Det som sällan hjälper',
  'near.topic.what_does_not_help.body':
    'Ultimatum du inte tänker stå för. Att hälla ut eller gömma. Att kontrollera mängder. Att ta över räkningar, jobb och konsekvenser. Att argumentera med någon som är påverkad — den personen kommer inte ihåg samtalet. Att göra dig själv till behandlare: du kan inte vara både anhörig och vårdgivare, och det är inte snålt att säga nej till det.',
  'near.topic.you_did_not_cause_it': 'Du orsakade det inte',
  'near.topic.you_did_not_cause_it.body':
    'Du kan inte ha orsakat ett beroende genom att vara fel sorts partner, förälder eller barn. Du kan inte kontrollera det, och du kan inte bota det. Det du kan göra är att bestämma vad du själv gör, och att inte försvinna själv under tiden.',

  'near.checkTitle': 'Var är du själv i det här?',
  'near.checkLede':
    'Fjorton påståenden om helt vanliga veckor. Svara som det faktiskt är, inte som du tycker att det borde vara. Ingenting skickas någonstans — det här räknas ut i din telefon och försvinner när du stänger sidan.',
  'near.checkNotADiagnosis':
    'Det här är inget test och ingen diagnos. Ordet "medberoende" används på tjugo olika sätt och används inte här. Det här visar bara tillbaka vad dina egna svar sa.',
  'near.scale.0': 'Aldrig',
  'near.scale.1': 'Ibland',
  'near.scale.2': 'Ofta',
  'near.scale.3': 'Nästan alltid',
  'near.checkResult': 'Det här sa dina svar',
  'near.checkTooLittle': 'För få svar för att säga något. Fyll i fler om du vill se något här.',
  'near.checkNothingLoud':
    'Inget mönster sticker ut i dina svar. Det betyder inte att det är lätt — bara att det du fyllde i inte pekar åt något särskilt håll idag.',
  'near.checkReset': 'Börja om',

  'near.statement.count_what_is_left': 'Jag håller koll på hur mycket som är kvar.',
  'near.statement.check_their_things': 'Jag letar i hens saker, telefon eller fickor.',
  'near.statement.covered_for_them': 'Jag har förklarat bort hen inför andra.',
  'near.statement.paid_what_was_theirs': 'Jag har betalat eller fixat sådant som var hens ansvar.',
  'near.statement.said_last_time_again': 'Jag har sagt "sista gången" mer än en gång.',
  'near.statement.agree_to_avoid_a_fight': 'Jag säger ja till saker för att slippa bråket.',
  'near.statement.stopped_doing_what_i_liked': 'Jag har slutat med sådant jag brukade tycka om.',
  'near.statement.sleep_badly_from_worry': 'Jag sover dåligt för att jag oroar mig.',
  'near.statement.keep_people_away': 'Jag håller andra borta från hemmet.',
  'near.statement.avoid_saying_how_it_is': 'Jag undviker att berätta hur det faktiskt är.',
  'near.statement.think_it_is_my_fault': 'Jag tänker att det är något jag har gjort.',
  'near.statement.search_for_what_i_missed': 'Jag går igenom vad jag borde ha sett tidigare.',
  'near.statement.read_the_mood_first': 'Jag läser av humöret innan jag säger något.',
  'near.statement.calm_only_when_i_know_where': 'Jag är lugn först när jag vet var hen är.',

  'near.pattern.control': 'Du håller koll',
  'near.pattern.control.body':
    'Att räkna, leta och kontrollera är begripligt — det är ett försök att få tillbaka lite förutsägbarhet. Det brukar bara inte fungera: mängden går att dölja, och du blir kvar med jobbet. Det du får i utbyte är att en del av din uppmärksamhet alltid ligger på en annan människas kropp.',
  'near.pattern.control.step':
    'Prova att välja en sak du slutar hålla räkningen på i en vecka, och märk vad som faktiskt händer.',
  'near.pattern.rescue': 'Du fångar upp',
  'near.pattern.rescue.body':
    'Att täcka upp och betala är kärlek under press. Det är också det som gör att konsekvenserna landar hos dig i stället för där de uppstod — och konsekvenser är ofta det som till slut får någon att söka hjälp. Det här är inte "du möjliggör beroendet". Det är att du bär något som inte är ditt.',
  'near.pattern.rescue.step':
    'Fundera på vad du skulle sluta göra om du visste att det inte hjälpte. Börja med det minsta.',
  'near.pattern.boundaries': 'Dina gränser flyttar sig',
  'near.pattern.boundaries.body':
    '"Sista gången" som blev flera gånger är inte svaghet. Det betyder oftast att gränsen var formulerad som ett krav på hen i stället för som ett besked om vad du själv gör — och den sortens gräns är omöjlig att hålla, eftersom du inte styr över hens beteende.',
  'near.pattern.boundaries.step':
    'Skriv om en gräns så att den bara handlar om dig: "Jag kör dig till akuten. Jag ger dig inte pengar."',
  'near.pattern.own_needs': 'Du har försvunnit lite',
  'near.pattern.own_needs.body':
    'Sömn, vänner och sådant du tyckte om är inte belöningar du får när hen blir frisk. De är det som gör att du orkar vara kvar över huvud taget. Det här pågår ofta i flera år, och ingen klarar flera år på beredskap dygnet runt.',
  'near.pattern.own_needs.step':
    'Boka in en sak den här veckan som är din och som inte handlar om hen. En sak räcker.',
  'near.pattern.secrecy': 'Det har blivit tyst runt er',
  'near.pattern.secrecy.body':
    'Att hålla andra borta skyddar hen från skam och dig från frågor. Priset är att ni blir ensamma med det, och isolering är en av de saker som gör det här svårast att bära. Du behöver inte berätta för alla. Men en människa till som vet är inte samma sak som att skvallra.',
  'near.pattern.secrecy.step': 'Välj en person som får veta hur det faktiskt är hemma.',
  'near.pattern.blame': 'Du letar efter ditt eget fel',
  'near.pattern.blame.body':
    'Att gå igenom vad du borde ha sett är ett sätt att försöka få ordning på något som inte är i ordning. Men du orsakade det inte, du kan inte kontrollera det, och du kan inte bota det. Det är inte en tröstformulering — det är helt enkelt inte din åtkomst.',
  'near.pattern.blame.step':
    'Nästa gång tanken kommer: skriv ner vad du faktiskt hade kunnat bestämma över i den situationen.',
  'near.pattern.hypervigilance': 'Du är alltid på vakt',
  'near.pattern.hypervigilance.body':
    'Att läsa av humöret innan du säger något, och att bara vara lugn när du vet var hen är — det är en kropp som stått i beredskap för länge. Det brukar synas i sömnen, magen och humöret långt innan man själv kopplar ihop det.',
  'near.pattern.hypervigilance.step':
    'Berätta för någon som inte är hen hur din vecka faktiskt har varit. Vården räknas.',

  'near.boundariesTitle': 'Meningar som går att säga högt',
  'near.boundariesLede':
    'En gräns är inte ett hot. Det är ett besked om vad du själv gör — den enda delen någon rår över.',
  'near.boundary.asked_for_money': 'Hen ber om pengar',
  'near.boundary.asked_for_money.say':
    '"Jag ger dig inte pengar. Jag kan handla mat med dig, och jag kan följa med när du ringer vården."',
  'near.boundary.drunk_at_home': 'Hen kommer hem påverkad',
  'near.boundary.drunk_at_home.say':
    '"Jag pratar inte om det här ikväll. Vi tar det imorgon när du är nykter." Och gör sedan det.',
  'near.boundary.promises_again': 'Hen lovar igen',
  'near.boundary.promises_again.say':
    '"Jag tror att du menar det. Jag går inte på löften längre, jag går på vad som händer."',
  'near.boundary.wants_a_lift': 'Hen vill ha skjuts till en fest',
  'near.boundary.wants_a_lift.say':
    '"Jag kör dig inte dit. Jag hämtar dig när du vill hem, när som helst, utan gnäll."',
  'near.boundary.blames_you': 'Hen skyller på dig',
  'near.boundary.blames_you.say':
    '"Jag är inte anledningen till att du använder. Jag är kvar, men jag tar inte det här."',
  'near.boundary.family_dinner': 'Middagen där alla ser på',
  'near.boundary.family_dinner.say':
    'Bestäm i förväg vad du gör om det spårar, och säg det till hen innan: "Om det blir så här går jag hem klockan nio."',
  'near.boundary.driving': 'Hen tänker köra bil',
  'near.boundary.driving.say':
    'Det här är inte en gräns att förhandla om. Ta nycklarna om du kan, låt bli att åka med, och ring 112 om hen kör ändå.',

  'near.resourcesTitle': 'Du får också ha någonstans att ta vägen',
  'support.se.alcohol_line': 'Alkohollinjen — svarar även anhöriga',
  'support.se.gambling_line': 'Stödlinjen — för dig som står nära någon som spelar',
  'support.se.health': '1177 Vårdguiden',
  'support.se.municipal': 'Kommunens anhörigstöd — sök på kommunens namn och "anhörigstöd"',
  'support.se.bris': 'Bris — för dig under 18 som har en förälder som använder',
  'support.us.samhsa': 'SAMHSA National Helpline — also for family members',
  'support.us.crisis': '988 Suicide & Crisis Lifeline',
  'support.gb.adfam': 'Adfam — for families affected by someone else’s drug or alcohol use',
  'support.gb.health': 'NHS 111',
  'support.generic.local': 'Anhörigstöd där du bor — fråga vårdcentralen eller kommunen',
  'near.noRequirement':
    'Cleat kräver aldrig att du går med i någon organisation, grupp eller rörelse — varken du eller hen.',

  'near.talkTitle': 'Bollplank',
  'near.talkLede':
    'Ett samtal om din situation, inte hens. Du kan skriva rakt ut: att du är trött, att du är arg, att du funderar på att lämna, att du inte känner igen dig själv längre.',
  'near.talkGreeting': 'Vad är det som är tyngst just nu — för dig, alltså?',
  'near.talkPlaceholder': 'Skriv vad som händer hos dig…',
  'near.talkNotAboutThem':
    'Jag vet ingenting om personen du beskriver, och jag har ingen kontakt med hens konto. Jag kan bara utgå från det du berättar.',
  'near.talkNoAdviceOnLeaving':
    'Ingen här kommer att säga åt dig att stanna eller att gå. Det beslutet vet du mer om än någon app.',
  'near.talkSignIn': 'Skapa ett eget konto för att prata',
  'near.backToApp': 'Till Cleat',
  'near.forThePersonTitle': 'Är det du själv som använder?',
  'near.forThePersonBody': 'Då är resten av Cleat byggt för dig.',

  // ---- Goal of the product ----
  'about.objective':
    'Målet är inte att du ska använda appen varje dag för alltid. Målet är att du bygger ett liv där du inte behöver den.',
} as const;

export type TranslationKey = keyof typeof sv;
export type Catalog = Record<TranslationKey, string>;
