import styled from "styled-components";
import config from "../../../config/config";

const Container = styled.div`
  width: 1280px;
  margin: 0 auto 100px auto;
  color: #fff;
  & h1 {
    font-size: 50px;
    font-weight: 500;
  }

  & h2 {
    font-size: 28px;
    font-weight: 400;
  }
  &a,&a: visited {
    color: #b6b6b6;
  }
`;

function getBrand() {
  switch (config.brand) {
    case "TEP":
      return "TEP";
    case "PGG":
      return "Pega Gaming";
    default:
      return config.brand;
  }
}

export function Faq(props) {
  return (
    <Container>
      <h1>FAQs</h1>
      <p>
        Get the answers to your Frequently Asked Questions about {getBrand()}{" "}
        right here. Then get back to playing and having the most fun possible at
        our casino online!
      </p>
      <h2>What features can I find in {getBrand()}?</h2>
      <p>
        {getBrand()} is the start of your online casino experience. When you log
        in, the online casino provides an easy way for you to stay in the know
        about daily promotions, most popular games or browse through top news
        and trends. You’ll see different gaming categories like slots, live
        dealer games and jackpots.
      </p>
      <h2>What Are Online Slots?</h2>
      <p>
        An online slot is a virtual casino game that plays out on a set of reels
        at an online casino. Different types of symbols populate the reels. In
        each round of the game, or spin, the reels spin and the symbols take up
        new positions, forming different combinations of symbols on the reels,
        which determines whether the player has collected any wins in that
        round. The patterns that the symbols have to form to generate wins are
        determined by a pay-out mechanic, which differs from game to game.
      </p>
      <h2>How Do Online Slots Work?</h2>
      <p>
        When the player clicks ‘spin’, the symbols appear on the reels at
        random. Combinations of matching symbols generate potential wins. These
        combinations can be paylines, clusters or “ways to win”. Slots usually
        have a main game and special bonus features that award things like win
        multipliers and free spins.
      </p>
      <h2>Can I play online slots at {getBrand()}?</h2>
      <p>
        Yes! Players can enjoy a wider range of online slots at {getBrand()}.
        Titles range from classic three-reel slots that emulate the original
        Vegas-style land-based cabinet slots to online video slots that draw on
        state-of-the-art graphics, sounds and animation for immersive,
        compelling game-play.
      </p>
      <h2>Which Online Slots Are The Best?</h2>
      <p>
        Ultimately, the player decides which are the best online slots for their
        particular preferences and style of play. All players are sure to find
        the best slots for them at {getBrand()} because there are over 500
        online slots to choose from.
      </p>
      <h2>Are all online casinos legal and fair?</h2>
      <p>
        Some online casinos carry a bad reputation, but {getBrand()} operates
        fairly and legally as it is regulated by the PAGCOR and has earned the
        prestigious independent seal of approval for safety and fairness. This
        casino guarantees online safety and has received accreditation to
        operate annually since 2018. {getBrand()} ensures strict rules and
        protocols are followed in order to fulfill the high standards that the
        industry has set.
      </p>
      <h2>Can you win real money with online casinos?</h2>
      <p>
        Yes, you can win real money when you play with certain online casinos.{" "}
        {getBrand()} offers a wide variety of online slots, table games, live
        dealer games and progressive jackpots to all its players. These
        life-changing progressives often start at $1 Million and can be won with
        one lucky spin. The games can be enjoyed at any time with bets starting
        at $1 or less.
      </p>
      <h2>What type of online casino games payout the most?</h2>
      <p>
        {getBrand()}’s progressive jackpots pay out the most and can be won at
        any time. Online slots and table games are also popular for lucrative
        payouts, and depositing and withdrawing is hassle-free thanks to the
        efficient range of banking methods available.
      </p>
      <h2>Which payment methods does {getBrand()} offer?</h2>
      <p>
        Players can deposit and withdraw via several seamless options, including
        bank transfers and web wallets like GCash. Once logged in, simply follow
        the instructions, complete the details to initiate a deposit or a
        withdrawal and submit. Safe and secure transactions can be completed
        24/7 via mobile or desktop, and a customer service team works around the
        clock to assist with any account related queries.
      </p>
      <h2>Can online casinos provide a realistic experience?</h2>
      <p>
        Yes, {getBrand()}’s innovative slot and live dealer selection is
        ultra-realistic and allows players to stream live table games online or
        via mobile. Their portfolio includes classic slots, video poker, table
        games, sportsbook, cockfighting, casual games, multiplayer titles and
        more in real time and in high definition. The live casino runs on
        intelligent HD-technology, and you can interact with other players from
        all around the world.
      </p>
      <h2>What kind of bonuses does {getBrand()} offer?</h2>
      <p>
        {getBrand()} offers generous match bonuses on your first four deposits
        to make sure you get the best start at the casino. {getBrand()} also
        regularly offers a variety of other promotions to all customers, such as
        deposit bonus and daily rebate.
      </p>
      <h2>Which online casino is the best?</h2>
      <p>
        Players rate {getBrand()} the best out of all available options because{" "}
        {getBrand()} hosts over 500 different casino games. With something for
        everyone, players can enjoy the games with complete peace of mind as{" "}
        {getBrand()} is licensed by PAGCOR. To ensure the best player
        experience, there’s 24-hour support available via live chat.
      </p>
      <h2>How do you start playing at {getBrand()}?</h2>
      <p>
        In order to play at {getBrand()}, you need to create an account and make
        a deposit. Once the deposit has successfully loaded to your account,
        you’re ready to bet on any of the over 500 casino games available. To
        deposit, simply follow the instruction, select a deposit method and fill
        in your details, and you’re ready to start playing!
      </p>
      <h2>How do online casinos work?</h2>
      <p>
        Online casinos work by making a large selection of games available to
        customers, who create accounts and deposit to play. The casino will
        verify details about the customers in order to remain compliant with
        regulations. Online casinos are strictly regulated to ensure a fair and
        legal environment is maintained.
      </p>
      <h2>How Do I Create an Account?</h2>
      <p>
        Creating a player account is very simple: 1. Select the “Register”
        button on the home screen. 2. Fill in the required information,
        including a username and password of your choice. 3. Confirm that you
        are of legal age to play. Your account will be ready within a few
        moments.
      </p>
      <h2>How Do I Login to My Account?</h2>
      <p>
        To login to your account make sure that your device is connected to the
        Internet and open the {getBrand()} homepage. Click the “Login” button,
        enter your username and password, and let the fun begin!
      </p>
      <h2>Help, I Forgot My Account Info…</h2>
      <p>
        If you’ve forgotten your password and you are trying to login to your
        account, don’t worry! Just click the “Forgotten Password” link on the
        login page and follow the instructions. We’ll assist you get your
        password back step by step.
      </p>
      <h2>How Do I Know Gaming is Safe and Fair?</h2>
      <p>
        {getBrand()} has been running since 2018, so we have a trusted brand
        with many years of experience behind us. We are also fully licensed by
        the PAGCOR. This means our security measures, game fairness and overall
        service have all been checked and found to meet high international
        standards.
      </p>
      <h2>Does {getBrand()} Support Responsible Gaming?</h2>
      <p>
        “Responsible gaming” is one of the most frequently heard gambling terms
        right now. At {getBrand()} we take the well-being of our players very
        seriously, so we definitely support gaming responsibly. We provide
        general information on problem gambling, including a self-assessment
        questionnaire, and give players the option of setting self-exclusion
        periods and deposit limits. You can learn more on our Responsible Gaming
        page.
      </p>
      <h2>Does {getBrand()} Offer Bonuses?</h2>
      <p>
        Yes, of course! Every respectable casino online offers bonuses and
        promotions, and {getBrand()} is more worthwhile than most. After you’ve
        made your first real money deposit you’ll be awarded our exceptional
        Welcome Bonus. Thereafter, look out for regular promotions that will
        keep your account topped up.
      </p>
      <h2>How Do I Place Bets?</h2>
      <p>
        At {getBrand()}, online real money bets are very easy to place. Choose
        the game you are interested in, and click or tap “Play Now”. You’ll see
        controls to set your bet type and amount, and once you’ve done this you
        can start your real money round.
      </p>
      <h2>What are Bonus Terms and Conditions?</h2>
      <p>
        The gambling terms and conditions on a bonus must be fulfilled before
        you are given the bonus itself, and before you can withdraw the funds.
        The conditions might stipulate how long you have to use the extra funds,
        or the games that you can play with them. The amount that you need to
        deposit to activate the bonus will be stated too.
      </p>
      <h2>What are Wagering Requirements?</h2>
      <p>
        Playthrough Requirements are also known as Wagering Requirements. They
        refer to how many times you need to bet a bonus amount before you are
        allowed to withdraw it. For example, if the Wagering Requirements on
        $100 is x50, you’ll need to bet $5000 before you can cash out that $100.
      </p>
      <h2>Why is the Bonus not in My Account?</h2>
      <p>
        If your bonus is not cleared into your player account, it’s usually
        because you haven’t met all the gambling terms and conditions that are
        required before a bonus is awarded. If you have met the terms and you’re
        still not receiving your extra funds, ask our Customer Support team for
        help.
      </p>
      <h2>Is There a VIP Loyalty Program?</h2>
      <p>
        {getBrand()} offers every kind of reward that you could wish for from an
        online casino, including a lucrative VIP Loyalty Program. Every time you
        place a real money bet, you’ll be closer to the next VIP level and also
        the exclusive benefits! Check our “VIP” page for more details.
      </p>
      <h2>What Are My Banking Options?</h2>
      <p>
        There’s more than just knowing how to play casino games to gambling
        successfully online. Secure and convenient banking options are also very
        important. In the “Deposit” and “Withdrawal” page you’ll be shown all
        the payment methods that are available to you.
      </p>
      <h2>How do I make Deposits?</h2>
      <p>
        Making deposits at our online casino is easy: 1. Navigate to the
        “Deposit” page, and choose the payment method that you want to use. 2.
        Enter the amount that you want to transfer, along with any other
        required details. 3. Check everything is correct, and click to confirm
        the deposit.
      </p>
      <h2>How do I make Withdrawals?</h2>
      <p>
        At {getBrand()} the process of cash withdrawals is also easy: 1. Go to
        the “Withdrawal” page. 2. Choose the existing bank card you wish to
        receive the cash, or add a new one. 3. Enter the amount you want to cash
        out. 4. Check that all details are correct and click to confirm your
        withdrawal. Our pending period is usually less than 24 hours, after
        which your request will be processed. The time taken for the funds to be
        transferred depends on the withdrawal system you’re using.
      </p>
      <h2>Why My Deposit Failed/ Missing?</h2>
      <p>
        Usually your deposit fails/ missing if you have insufficient funds, or
        if there is a technical connection problem between your device and the{" "}
        {getBrand()} site. Check that you have enough money available and that
        your Internet connection is working. If you’re still having trouble, try
        exiting the website and then logging back in. If you still don’t come
        right, contact our Customer Service via Live Chat.
      </p>
      <h2>Why My Withdrawal Failed?</h2>
      <p>
        If your withdrawal failed, please check the following issues: 1. Have
        the withdrawal requests pending and processing times finished? 2. Are
        your funds available or do you still need to fulfill certain terms and
        conditions before you can access them? 3. Is your Internet connection
        working? If none of these issues is the problem, re-login to your player
        account, and try again. If you’re still having trouble, please allow our
        Customer Service Agent to assist you via Live Chat.
      </p>
      <h2>Can I Play on My Mobile?</h2>
      <p>
        You don’t have to worry about how to play casino games when you’re busy
        and on the go, because {getBrand()} works just as well on tablets and
        smartphones as it does on desktops! Our flexible software works
        perfectly on whatever device you want to use, including iOS and Android.
        You’ll also use the same login information to access the same account as
        on your desktop, for total convenience.
      </p>
      <h2>I Need More Help…</h2>
      <p>
        If you haven’t found the answers you need on this FAQs page, you can get
        in touch with the {getBrand()} online Customer Service Agents at any
        time. They’re available via live chat 24 hours a day, 7 days a week.
        They’ll help you resolve any problem quickly and efficiently, from
        explaining gambling terms to dealing with deposit issues and everything
        in between!
      </p>
    </Container>
  );
}

export function TermsAndConditions(props) {
  return (
    <Container>
      <h1>Terms & Conditions</h1>

      <p>
        Version: 3.0 <br />
        Last revised: 2022/12/09 <br /> <br />
        These Rules, Terms and Conditions apply to, and are binding upon you if
        you participate at the Casino. <br />
        This page defines the Terms and Conditions that apply to all monies and
        wagers accepted by us and all Services offered by, and on any Website
        powered by us.
        <br />
        These Rules, Terms and Conditions replace any pre-existing Rules, Terms
        and Conditions that appeared on this Casino Website. In these Rules,
        Terms and Conditions:
        <br />
        "Account" means a unique Account that has been issued to you by the
        Casino.
        <br />
        "Agreement" means these Rules, Terms and Conditions;
        <br />
        the "Casino" means the casino situated at the Casino Website and owned
        and/or operated by us;
        <br />
        "Casino Group" means collectively all the online casinos proprietary to
        us.
        <br />
        "Casino Website" {getBrand()} or any derivative thereof;
        <br />
        "Charge-back" means when you, or a credit card issuing bank, or any
        other third party payment solutions provider effects a reversal of
        charges in relation to your credit card or third party deposit
        transaction;
        <br />
        "Closed Player Account" means an Account that has been closed,
        deregistered or excluded by either us or you;
        <br />
        "Inactive Account" means a Player's Account which has not recorded any
        login and/or logout for a period exceeding 1 (One) consecutive months
        without the requirement of any financial transaction;
        <br />
        "Guest Player" means a Player who utilizes free-play casino credits with
        no monetary value to place wagers at the Casino;
        <br />
        "Participate" means, without limitation, any of the conduct described in
        4.1.1 to 4.1.7 below and visiting the Casino Website and/or playing any
        games offered by the Casino at the Casino and/or utilizing the Casino
        and/or Casino Website and/or the Software in any manner whatsoever;
        <br />
        "Payment Service Provider" means a 3rd party with whom we have an
        arrangement to process money transfers.
        <br />
        "Player/s" mean(s) a Real Player and/or a Guest Player and/or an
        Inactive Player and/or a Closed Account Player;
        <br />
        "Real Player" means any player who has registered an Account at the
        Casino; the "Service" means the availability to, and provision of
        Software that enables you to play at the Casino using the Internet or
        your mobile phone;
        <br />
        "Software" means any software owned by or licensed to us that must be
        downloaded in order for you to participate at the Casino and/or any
        Flash Games versions of the software that do not need to be downloaded;
        <br />
        <br />
        For users in Philippine, all transactions between the Player and {getBrand()}{" "} 
        take place in Philippine where the principal servers are based.
        The Player's gaming contract is with {getBrand()}. {getBrand()} is the
        company who provides the gaming services to the Player.
        <br />
        For users elsewhere, all transactions between the Player and{" "}
        {getBrand()} take place in Philippines where the principal servers are
        based. The Player's gaming contract is with {getBrand()}. {getBrand()}{" "}
        is the company who provides the gaming services to the Player.
        <br />
        "Your Jurisdiction" means the jurisdiction in which you are domiciled,
        reside or work.
        <br />
      </p>

      <h2>1. YOUR PARTICIPATION AT THE CASINO</h2>

      <p>
        1.1 PARTICIPATION
        <br />
        <br />
        1.1.1 Participation at the Casino is at your sole option, discretion and
        risk.
        <br />
        <br />
        1.1.2.1 Internet Gambling may be illegal in the jurisdiction / country
        in which You are located or residing. The Casino does not intend to
        enable You to contravene applicable law. You are responsible for any
        gaming activity and You are also responsible for ensuring that You are
        not contravening any law or legislation prohibiting gaming online.
        Before relying on any information contained on the Website you should
        consult the rules in your jurisdiction. The Casino excludes to the
        fullest extent lawfully permitted all liability for any use of the
        Website, whether the service is moderated or not. You are solely
        responsible for ascertaining whether it is legal in Your Jurisdiction to
        participate at the Casino.
        <br />
        <br />
        1.1.2.2 The Casino cannot open accounts, or process bets or financial
        transactions, for individuals residing in Afghanistan, American Samoa,
        Andorra, Argentina, Australia, Austria, Belarus, Belgium, Botswana,
        Bulgaria, Cameroon, China, Christmas Island, Cocos (Keeling) Islands,
        Colombia, Congo, Cuba, Czech Republic, Denmark, Estonia, Ethiopia,
        France, French territories (Mayotte, Martinique, Guiana, Guadeloupe,
        Reunion, Saint Barthelemy, Saint Pierre and Miquelon, New Caledonia),
        Germany, Ghana, Greece, Greenland, Guam, Heard Island and McDonald
        Islands, Holy See, Hong Kong, Hungary, Iran (Islamic Republic of),
        Israel, Italy, Kenya, Lithuania, Macao, Micronesia, Mozambique, Myanmar,
        Netherlands, Nicaragua, Nigeria, Norfolk Island, North Korea, Northern
        Mariana Islands, Paraguay, Poland, Portugal, Puerto Rico, Republic of
        North Macedonia, Romania, Russia, Rwanda, Saint Martin, Serbia,
        Singapore, Slovenia, Somalia, South Africa, Spain, St Helena,
        Switzerland, Syria, Taiwan, Tanzania, Turkey, Uganda, Ukraine, United
        Kingdom of Great Britain and Northern Ireland, United States Minor
        Outlying Islands, United States of America, Vatican City State,
        Venezuela, Virgin Islands (British), Virgin Islands (US), Wallis And
        Futuna Island, Yemen and Zambia. Furthermore, the casino cannot open
        accounts for individuals residing in Austria, Mexico and Slovakia. The
        Casino reserves the right to amend the list of countries from which it
        will not open accounts, or process bets or financial transactions from
        time to time at its sole discretion.
        <br />
        <br />
        1.1.3 You may only participate at the Casino if it is legal for you to
        do so within Your Jurisdiction.
        <br />
        <br />
        1.1.4 All applicants must be over 18 years of age to register with the
        Casino. In addition to the provisions of 1.1.3 above, you may only
        participate at the Casino if you have attained the legal age of majority
        within Your Jurisdiction. We reserve the right to ask for Your proof of
        age and suspend Your account until satisfactory documentation is
        provided.
        <br />
        <br />
        1.1.5 We do not warrant the legality of your participation at the Casino
        in terms of the laws of Your Jurisdiction.
        <br />
        <br />
        1.1.6 We have the right to request you to furnish us with proof of your
        identity and age as a condition precedent to us allowing you to
        participate. All information supplied upon registration must be accurate
        and complete in all respects.
        <br />
        <br />
        1.1.7 You hereby authorize us and our designated agents in rem suam, as
        and when we require, to confirm your identity and your right to use the
        monies that you wager at the Casino.
        <br />
        <br />
        1.1.8 You may not open and maintain more than one account at any point
        in time.
        <br />
        <br />
        1.1.9 Funds and/or Casino credits may not be transferred between Casino
        accounts belonging to the same player or third parties.
        <br />
        <br />
        1.1.10 The Casino at its discretion reserves the right to pay any
        winnings in Peso, irrespective of the currency the player's account has
        been registered in or the bet was placed.
        <br />
        <br />
        1.1.11 We have the right to verify the account information at any time
        and suspend the account pending adequate verification. You are asked to
        keep Your registration details up to date.
        <br />
        <br />
        If You change Your address, email, phone number or any other contact or
        personal information please contact customer service agent in order to
        update Your account information.
        <br />
        <br />
        1.1.12 You agree to receive communications from the Casino Group and
        their marketing agents.
        <br />
        <br />
        1.1.13 The casino does not allow players to gamble on credit.
        <br />
        <br />
        1.1.14 The Casino allows You to choose Your own username and password
        combination. You are required to create a secure robust password and
        keep this information secret. Any actions carried out through Your
        account will stand if Your username and password have been entered
        correctly, that would include any financial losses. We will not be held
        liable should your account be compromised due to security weaknesses on
        devices or weak and shared passwords. In accordance with the Regulations
        Players will refrain from using obscene or offensive usernames or
        aliases. Should a Player elect to do so we reserve the right to close
        your account.
        <br />
        <br />
        1.1.15 All Player offers are limited to one per person, family,
        household address, email address, telephone number, debit/credit card
        and shared computer, e.g. school, public library or workplace. All
        casino offers are intended for recreational players and we may in our
        sole discretion limit the eligibility of Players to participate in any
        promotion. We reserve the right to withdraw the availability of any
        offer or all offers to any Player or group of Players.
        <br />
        <br />
        1.1.15.1 We reserve the right to reclaim all bonuses awarded and any
        winnings accrued if Players are found to be tampering with or abusing
        any aspect of a casino promotion. Where there is evidence of a series of
        bets placed by a Player or group of Players, which due to enhanced
        payments through promotional offers results in guaranteed Player profits
        irrespective of the outcome, we reserve the right to ignore the bonus
        element of such offers and settle bets at the correct odds. We further
        reserve the right to ask any Player to provide sufficient documentation
        for us to be satisfied in our absolute discretion as to the Player's
        identity prior to us crediting any bonus, free bet or offer to their
        account.
        <br />
        <br />
        1.1.16 By registering, you are deemed to have accepted and understood
        all the rules, Terms and Conditions displayed on the Website by the
        Group. We recommend that all members print out (or save to file) all
        transaction records, rules of play, cancellation policies, and pay-out
        policies.
        <br />
        <br />
        1.1.17 If using a credit or debit card, the Cardholder's name MUST be
        the same as the name used when registering with the site. Where this is
        not the case the account may be suspended. Where an account is
        suspended, You should contact Player Services for details of our
        verification process. Any withdrawals that are made by bank wire or
        cheque will only be payable to the name used when registering with the
        site and if a debit or credit card has been used to deposit funds the
        name must correspond to the name registered on the card.
        <br />
        <br />
        1.1.18 Updating or adding additional payment details may only be done by
        contacting Player Services. It is Your responsibility to make Yourself
        aware of the terms upon which Your payments are accepted. You are solely
        responsible to keep abreast of any changes.
        <br />
        <br />
        1.1.19 We have an obligation to remit funds to players within a
        reasonable amount of time. Therefore, withdrawn uncontested funds,
        pending for withdrawal may be reversed back to the casino account should
        Players not respond or abide by the withdrawal requirements. Should
        withdrawals be reversed they will be available for play within the
        Casino. The casino will not be held liable for funds used.
        <br />
        <br />
        1.1.20 If you do not wish to have pending funds made available to you,
        you will be required to contact Customer Support directly and
        temporarily lock your account.
        <br />
        <br />
        1.1.21 All applicants may be sent an email to the registered email
        address for account activation. All accounts may be activated through
        this email. If this is not completed, the Casino reserves the right to
        suspend all activities on the account until the account details are
        verified.
        <br />
        <br />
        1.1.22 Any monies held in Your account shall not attract interest.
        <br />
        <br />
        1.2 YOUR WARRANTIES
        <br />
        <br />
        1.2.1 You warrant and represent, and we enter into this Agreement on the
        basis of such representations and warranties, all of which are material
        at the time of your entering into this Agreement and throughout the
        currency hereof, that you:
        <br />
        <br />
        1.2.1.1 are legally able to participate in the Casino within Your
        Jurisdiction;
        <br />
        <br />
        1.2.1.2 are an "adult", having attained the age of majority within your
        Jurisdiction;
        <br />
        <br />
        1.2.1.3 shall not allow any third party (in particular, but without
        limitation, any minor/s) to, directly or indirectly, use your Account/s
        that you hold at the Casino, utilize the Software or accept a prize from
        the Casino;
        <br />
        <br />
        1.2.1.4 have furnished us with personal details that are valid, accurate
        and complete in each and every respect and that you shall advise us
        immediately via email should such details change;
        <br />
        <br />
        1.2.1.5 are the true and lawful owner of the monies that you wager at
        the Casino and/or that you are duly and properly authorized to utilize
        such monies for the aforementioned purposes;
        <br />
        <br />
        1.2.1.6 shall not deposit nor wager any monies at the Casino that are
        derived in any manner whatsoever from illegal activities contemplated in
        1.6 below;
        <br />
        <br />
        1.2.1.7 shall pay all monies owed to the Casino and in respect of
        payment shall not charge-back, and/or deny or reverse or countermand any
        such payments;
        <br />
        <br />
        1.2.1.8 have read and understood these Rules, Terms and Conditions; and
        <br />
        <br />
        1.2.1.9 participate at the Casino on an individual basis and for
        personal entertainment only (that is, Not in a professional sense or in
        concert with other Player(s) as part of a club, group, etc.)
        <br />
        <br />
        1.2.2 If you breach the warranty contained in clause 1.2.1 above, all
        transactions placed by you shall be null and void and you shall forfeit
        any winnings accrued to you as a result of such transactions and/or
        participation.
        <br />
        <br />
        1.3 REFUSAL TO REGISTER, DEREGISTRATION, EXCLUSION & SUSPENSION
        <br />
        <br />
        1.3.1 We may refuse to register you as a player or elect to deregister
        and exclude you or suspend you as a player from the Casino at any time.
        Written notice of our intention will be given with appropriate reasons.{" "}
        <br />
        <br />
        1.4 CONSEQUENCES OF DEREGISTRATION, EXCLUSION OR SUSPENSION
        <br />
        <br />
        1.4.1 If we deregister, exclude or suspend you from the Casino you have
        the right to file a complaint. <br />
        <br />
        1.4.2 If you do not file a complaint within thirty (30) days of the date
        on which you were deregistered, excluded or suspended from the Casino,
        we shall have the right to:
        <br />
        <br />
        1.4.2.1 withhold payment to you of any contested funds whether such
        contested funds are, refunds, bonuses, free monies, Casino credits,
        payouts or the like;
        <br />
        <br />
        1.4.2.2 exclude you from all or any other Casinos in the group of
        Casinos of which the Casino is a member; and/or
        <br />
        <br />
        1.4.2.3 solely determine what criteria you shall have to meet in order
        to establish a New Account at the Casino; and/or
        <br />
        <br />
        1.4.2.4 in the case of fraudulent, illegal or similar misconduct by you
        or failure by you to pay any sums due to us:
        <br />
        <br />
        1.4.2.4.1 furnish any relevant information about you to an intra-group
        database recording such mischief and, if necessary, hand over your
        account details to a collections agency for the recovery of any sums
        that you owe us. You hereby irrevocably authorize us to do so in our
        absolute discretion, and/or
        <br />
        <br />
        1.4.2.4.2 have forfeited to us any contested funds that may be derived
        by you from fraudulent, illegal or similar misconduct.
        <br />
        <br />
        1.4.3 If you do file a complaint with our regulating body within thirty
        (30) days, we will only withhold payment to you of contested funds, of
        any kind, if our regulating body directs that we may do so. We will pay
        you any funds our regulating body directs us to pay.
        <br />
        <br />
        1.5 INACTIVE ACCOUNTS & INACTIVE BONUS BALANCES
        <br />
        <br />
        1.5.1 It is recorded that the provisions of this Clause 1.5 only apply
        if all of a Real Player's Accounts at the Casino Group constitute
        inactive Accounts.
        <br />
        <br />
        1.5.2 Any credit balance standing to an Inactive Player's Account may,
        in the Casino's sole and unfettered discretion, be handled by the Casino
        as follows:
        <br />
        <br />
        1.5.2.1 an administration fee equivalent to 1000 Peso of such credit
        balance shall be levied monthly thereon and deducted there from until
        the earlier of:
        <br />
        <br />
        1.5.2.1.1 the credit balance being reduced to zero; or
        <br />
        <br />
        1.5.2.1.2 the Inactive Account becoming active; or
        <br />
        <br />
        1.5.3 Notwithstanding meeting any play through requirement, in our sole
        and absolute discretion, you may lose any bonuses and winnings derived
        from such bonuses if such monies remain unused by you at the Casino for
        a period of six months from the date on which such bonus(es) were
        awarded. For the purpose hereof all Loyalty points awarded shall be
        construed to be Bonuses.
        <br />
        <br />
        1.6 MONEY LAUNDERING
        <br />
        <br />
        1.6.1 It is recorded that some jurisdictions have strict laws on money
        laundering that may impose an obligation upon us to report you to the
        federal or local authorities within such jurisdictions if we know,
        suspect or have reason to suspect that any of your transactions, amongst
        other things, involve funds derived from illegal activities or are
        intended to conceal funds derived from illegal activities or involve the
        use of the Casino to facilitate criminal activity.
        <br />
        <br />
        1.6.2 If we have knowledge or suspicion envisaged in 1.6.1 above we may:
        <br />
        <br />
        1.6.2.1 immediately suspend, deregister or terminate your Account at the
        Casino; and/or
        <br />
        <br />
        1.6.2.2 at our sole discretion, not refund to you any funds held in such
        Account; and/or
        <br />
        <br />
        1.6.2.3 exclude you from all or any other Casinos in the group of
        Casinos of which the Casino is a member; and/or
        <br />
        <br />
        1.6.2.4 furnish any relevant information about you to an intra-group
        database recording such mischief. You hereby irrevocably authorize us to
        do so in our absolute discretion.
        <br />
        <br />
        1.6.3 We reserve the right to report you to the aforementioned federal
        or local authorities should we, in our absolute discretion; determine
        that we are obliged, by law, to do so.
        <br />
        <br />
        1.6.4 In order to assist in the prevention of money laundering:
        <br />
        <br />
        1.6.4.1 no cash shall be accepted to fund any Account at the Casino;
        <br />
        <br />
        1.6.4.2 no substantial and/or exceptional withdrawals individually and
        cumulatively shall be made unless notarized facsimile copies of the
        following are received:
        <br />
        <br />
        1.6.4.2.1 most recent bank statement for the bank account from which
        your wager have been paid;
        <br />
        <br />
        1.6.4.2.2 a copy of a government issued photo identity document, i.e.
        driver's license; current and valid passport, identity card, etc.
        <br />
        <br />
        1.6.4.2.3 a copy of a utility bill no older than 6 months clearly
        reflecting your registered address and name, i.e. most recent bank
        statement, gas or electricity bill, etc.
        <br />
        <br />
        1.7. PUBLICITY
        <br />
        <br />
        1.7.1 If, whilst playing at the Casino, you win a sum of money or any
        other prize regarded by the Casino as worthy of publicity, you agree to
        make yourself available for any event of such a nature arranged by the
        Casino. The Casino will do its utmost to protect your privacy at all
        times.
        <br />
        <br />
        1.7.2 Without derogating from the generality of clause 1.7.1 above, you
        hereby grant us the right to use your first name in any publicity about
        your win mentioned above and to use a picture of a model in your stead.
        <br />
        <br />
        1.7.3 For further information on our privacy policy please see the
        relevant link on this Casino Website.
        <br />
        <br />
        1.8. YOUR CONSENT
        <br />
        <br />
        1.8.1 Telephone calls may be recorded or monitored for quality and/or
        security purposes. By using this service, you are consenting to the
        recording or monitoring thereof.
        <br />
        <br />
        1.8.2 We may collect and record all internet communications, details of
        transactions you carry through the site and details of your visits to
        the site.
        <br />
        <br />
        1.8.3 In registering a Practice or Real account, you hereby consent to
        us contacting You through any and all means of communication (whether in
        written or verbal form and including, but not limited to email,
        telephone and SMS) in respect of matters relating to Your account. To
        unsubscribe to any or all forms of communication, please contact us
        directly.
        <br />
        <br />
        1.8.4 If you unsubscribe, or have previously unsubscribed, from our
        general promotional materials, you will still receive business related
        communication. Please allow 3 working days to be removed from our
        mailing lists. Should you have any questions regarding any of the
        'legalese', please contact us and we will be happy to assist you.
        <br />
        <br />
        1.9 USE OF AUTOMATED PLAYERS ('BOTS') AND ILLEGAL SOFTWARE
        <br />
        <br />
        1.9.1 The use and abuse of a bug or bots or any other form of artificial
        intelligence in any of the Software or Services provided on the Casino
        platform is illegal.
        <br />
        <br />
        1.9.2 The use of software to influence or modify the outcome of any of
        the games in the Casino for financial gain is strictly forbidden and any
        monies acquired in this way will be deducted from the Player's funds.
        <br />
        <br />
        1.9.3 The Casino shall take all necessary measures in case of a use
        and/or abuse of a bug, bot or any other form of artificial intelligence
        from a Player as blocking of the Player account, freezing of the funds
        and reserve the right to legal proceedings.
      </p>
      <h2>2. THE SERVICE</h2>
      <p>
        2.1. The Casino is not liable for any downtime, server disruptions,
        lagging, or any technical or political disturbance to the game play. We
        are not liable for any acts or omissions made by Your internet service
        provider or any third party with whom You have contracted to gain access
        to the server that hosts the Website. Software and Services are provided
        'as is' and the Casino makes no warranties or representations, whether
        express or implied (whether by law, statute or otherwise) including but
        not limited to implied warranties and conditions of merchantability,
        satisfactory quality, fitness for a particular purpose, completeness or
        accuracy of the Software/Services or infringement of applicable laws and
        regulations. The entire risk of the use, quality and performance of the
        Software/Services relies on You.
        <br />
        <br />
        2.2. We shall not be liable for computer malfunctions, failure of
        telecommunications service or Internet connections nor attempts by you
        to participate in games by methods, means or ways not intended by us.
        You are solely responsible for any telecommunications devices and
        services utilized by you to participate at the Casino.
        <br />
        <br />
        The Casino makes no warranty that the Software or Services will meet
        Your requirements, be uninterrupted, timely, secure or error-free, that
        defects will be corrected or that the Software or server that makes it
        available are free from viruses or bugs or represents that the full
        functionality, accuracy and reliability of the Software or Services as
        to results or accuracy of any information obtained by You. In the event
        of systems or communications errors relating to the generation of random
        numbers, bet settlement or other elements of the Product, we will not be
        liable to You as a result of any such errors and we reserve the right to
        void all bets on the draws in question.
        <br />
        <br />
        2.3. We cannot guarantee that the Service will never be faulty but we
        will correct reported faults as soon as we reasonably can. If a fault
        occurs, you should report the fault to Customer Service.
        <br />
        <br />
        2.3.1 The Casino shall accept no liability for any damages or losses
        which are deemed or alleged to have arisen out of or in connection with
        the Website or the Services; including without limitation, delays or
        interruptions in operation or transmission, loss or corruption of data,
        communication or lines failure, any person's misuse of the site or its
        content or any errors or omissions in content.
        <br />
        <br />
        2.3.2 We reserve the right to refuse or limit any wager(s) at our sole
        discretion for any reason whatsoever. In circumstances where a stake is
        deemed to be or is declared void by us at our discretion, any sum
        deducted from Your account with respect to that stake or wager shall be
        credited to Your account. Wagers shall only be valid if accepted by our
        server and subject to the Agreement. Until acceptance, no communications
        from You shall be binding on us and all information displayed on this
        site constitutes an invitation to play only. Malfunction (whether on a
        Website or Your equipment) voids all pays and plays. Should we determine
        to waive a rule in the interest of fair play to You, it shall only be
        for that instant and shall not set a precedent for the future.
        <br />
        <br />
        2.4. The Casino reserves the right to void any winnings that were
        obtained as a result of hardware/software error or malfunction. Players
        found abusing such errors/malfunctions are subject to having their
        account closed and any deposits and/or winnings forfeited. In the event
        of a Website system malfunction all bets are void. The Casino reserves
        the right to suspend, modify or remove or add to the Website any games
        or software at its sole discretion with immediate effect and without
        notice. The Casino shall not be liable to You for any loss suffered by
        You resulting from any changes made or for any modification or
        suspension of or discontinuance of the Software or Services and You
        shall have no claims against the Casino in such regard.
        <br />
        <br />
        2.5. We may temporarily suspend the whole or any part of the Service for
        any reason at our sole discretion. We may, but shall not be obliged to,
        give you as much notice as is reasonably practicable of such suspension.
        We will restore the Service, as soon as is reasonably practicable, after
        temporary suspension.
        <br />
        <br />
        2.6. In the event of a Casino system malfunction all wagers are void.
        Refunds may be given solely at the discretion of Casino Management.
        Where a manifest error, mistake or system failure results in an
        incorrect odd, line or handicap taken in a bet, the bet, or that part of
        the bet if it is a multiple bet/parlay will be null and void.
        <br />
        <br />
        2.7 In accordance with clause 4.2 below, we will not be liable to you
        for any loss that you may incur as a result of such suspension or delay.
        <br />
        <br />
        2.8. It is the sole responsibility of the player to account and report
        relevant taxes on winnings that might be applicable in their
        jurisdiction.
        <br />
        <br />
        2.9. The Casino does not provide advice to Players regarding tax and/or
        legal matters. Players who wish to obtain advice regarding tax and legal
        matters are advised to contact appropriate advisors and/or authorities
        in the jurisdiction in which they are domiciled and/or resident.
        <br />
        <br />
        2.10. Players are strictly prohibited from utilizing the Casino and its
        systems to facilitate arbitrage through Currency Exchange transactions.
        Where the Casino deems that a Player has deliberately used the
        aforementioned systems for financial gain through arbitrage, any gains
        will be forfeited and deducted from the Players balance without warning
        or notification.
        <br />
        <br />
        2.11. You are permitted to install and use the Software and all content
        derived from the Software in connection with the use of the websites in
        accordance with these Terms and Conditions. The Software allows You to
        use our gambling services available via the websites (the 'Services').
        You may install the Software on a hard disk or other storage device and
        may make backup copies of the Software, provided that such backup copies
        are used only by You in connection with the Services through a computer
        of which You are the principal user. The Software's code, structure and
        organization are protected by intellectual property rights. You must
        not:
        <br />
        <br />- Copy, redistribute, publish, reverse engineer, decompile,
        disassemble, modify, translate or make any attempt to access the source
        code to create derivative works of the source code or otherwise.
        <br />- Sell, assign, sublicense, transfer, distribute or lease the
        Software.
        <br />- Make the Software available to any third party through a
        computer network or otherwise.
        <br />- Export the Software to any country (whether by physical or
        electronic means).
        <br />- Use the Software in a manner prohibited by applicable laws or
        regulations.
        <br />
        Together the 'Non-Permitted Uses' You will be solely liable for any
        damage, costs or expenses arising out of or in connection with the
        commission of any Non-Permitted Uses.
        <br />
      </p>

      <h2>3. SHARED ENVIRONMENTS</h2>

      <p>
        We may impose any limits or conditions that we, in our sole discretion,
        deem fit on any persons who open or attempt to open Accounts at the
        Casino where such Accounts originate from environments where computers
        are, or the environment is shared.
        <br />
      </p>

      <h2>4. INDEMNITY & LIMITATION OF LIABILITY</h2>

      <p>
        4.1. You agree that You are free to choose whether to use the Services
        and do so at Your sole option, discretion and risk. You indemnify and
        hold harmless the Casino, its directors, officers, employees,
        shareholders, agents and affiliates, the ultimate parent and parent
        companies of the Casino and any of its subsidiaries against any and all
        costs, expenses, liabilities and damages (whether direct, indirect,
        special, consequential, exemplary or punitive or other) arising from any
        participation by you at the Casino. The nature of your participation
        shall include, but not be limited to, inter alia:
        <br />
        <br />
        4.1.1. visiting, use or re-use of this Casino Website;
        <br />
        <br />
        4.1.2. use or re-use of any materials at, or obtained from, this Casino
        Website or any other source whatsoever;
        <br />
        <br />
        4.1.3. entry, use or re-use of the Casino Website server;
        <br />
        <br />
        4.1.4. facilitating or making a deposit into your Account at the Casino;
        <br />
        <br />
        4.1.5. wagering or gaming at the Casino;
        <br />
        <br />
        4.1.6. acceptance and use of any win or prize at or from the Casino;
        <br />
        <br />
        4.1.7. use or re-use of the Casino software, whether downloaded from the
        Casino Website or by any other means or through any other medium.
        <br />
        <br />
        4.2. In no circumstances whatsoever shall the Casino, its directors,
        officers, employees, shareholders, agents and affiliates, the ultimate
        parent and parent companies of the Casino and any of its subsidiaries be
        liable to you in contract, tort, negligence or otherwise, for any loss
        or damage howsoever arising from any cause whatsoever, whether direct or
        indirect, or for any amounts whatsoever (even where we have been
        notified by you of the possibility of such loss or damage).
        <br />
        <br />
        4.3. Upon confirmation of money transfer from us to the Payment Service
        Provider, we shall not be liable for any damages, loss or cost suffered
        or incurred by a Player (including any damages, loss or costs suffered
        or incurred as a result of a failure to pay or delay in payment).
        <br />
        <br />
        4.4 The Casino, its directors, officers, employees and shareholders
        shall not be liable for any acts or omissions of or advertisements
        published by third party advertisers and marketers.
        <br />
        <br />
        4.5 Nothing in this Agreement will operate so as to exclude any
        liability of the Company for fraud, death or personal injury that is
        caused by the Company's negligence.
      </p>

      <h2>5. PROMOTIONS, COMPETITIONS AND THE CASH-BACK PROGRAM</h2>

      <p>
        5.1. It is recorded that the Casino shall, from time to time, offer
        certain promotions, competitions and a cash- back program and that these
        competitions, promotions and cash- back programs may have separate
        terms, conditions and rules that are competition, promotion or cash-
        back program -specific and any complimentary bonus credited to Your
        account must be used in adherence with such terms and conditions. Where
        wagering requirements for bonus money or free credits are not
        specifically stipulated in promotional offers then these rules will
        apply.
        <br />
        <br />
        5.2. These Rules, Terms and Conditions apply to any competition,
        promotion and cash- back program.
        <br />
        <br />
        5.3. In the event of a conflict between these Rules, Terms and
        Conditions and the promotion, competition and/ or cash- back program
        -specific Rules, Terms and Conditions, the promotion, competition and/
        or cash- back program -specific Rules, Terms and Conditions (as
        applicable) shall prevail but only to the extent that the Rules, Terms
        and Conditions conflict with one another.
        <br />
        <br />
        5.4. The Casino reserves the right to exclude players from taking part
        in any promotion in its sole discretion. Promotions are for limited time
        only and the Casino reserves the right to terminate any Promotion at any
        time without prior notice. If unused casino bonuses remain, that bonus,
        as well as any winnings generated by such bonuses and loyalty points
        issued, will lapse after 6 months of date of issue. This is applied at
        the Casino's absolute discretion notwithstanding having met playthrough
        requirements for such bonuses.
        <br />
        <br />
        5.5. The Cash-Back Program offered at the discretion of the Casino and
        no correspondence shall be entered into by the Casino with regard to any
        aspect of the Cash-Back Program (including, without limitation, the
        crediting or debiting of Cash- Back Points to a Player's Account, the
        ratio of Cash- Back Points to Casino Credits awarded and a Player's
        eligibility or lack thereof in participating in the Cash- Back Program).
        The Cash-Back Program can be withdrawn from a Players Casino Account
        without notice.
        <br />
        <br />
        5.6. The Casino is a member of the Casino group. You may not claim a
        Bonus at the Casino if (1) prior to opening an Account at the Casino,
        you have opened an Account at any other online casino within the Casino
        Group and claimed such a Bonus from such other online casino and (2)
        having claimed such Bonus from the other online casino within the Casino
        Group, wagered such previously claimed Bonus and initial deposit less
        than 100 times at the online casino granting you such Bonus. Under no
        circumstances shall you be eligible for more than one sign- up bonus at
        the Casino even if you are able to open multiple Accounts thereat (in,
        for example, different currencies or languages). If your Account at the
        Casino has been credited with a sign- up bonus for which you (in our
        sole and unfettered discretion, not to be exercised unreasonable) are
        ineligible, the Casino shall retrospectively void such sign- up bonus
        and any winnings received by you after the sign- up bonus has been
        credited to your relevant Accounts.
        <br />
        <br />
        5.7. Bonus amounts are subject to a minimum wagering requirement of at
        least 70 times ("Play- Through Requirement") before it can be
        transferred from your Bonus Balance to your Cash Balance. The Play-
        Through Requirement imposed will vary at our sole discretion per game,
        promotion and/or region to region. For example, if you deposit 100 and
        receive a 100 credit bonus, the Play Through Requirement will be 70 x
        100 = 7000. Any winnings attributed to the Cash portion of your balance
        can be withdrawn at any time, subject to meeting all of these terms and
        conditions. In order to meet the wagering requirements, please see the
        contributing percentages on the applicable promotion specific rules.
        <br />
        <br />
        5.7.1 Any winnings from no purchase required offers as well as free
        spins will be subject to a 70x wagering requirement in order for the
        bonus money there to be transferred into the cash balance. Specific game
        play-through is standard as per Promotion - specific Terms and
        Conditions. In the event that a Player has a positive cash balance after
        the 70x wagering requirement is complete and such Player attempts to
        make a withdrawal, the withdrawal will be capped at 100 Casino Credits
        (in the Player's currency of play) and the remaining cash balance will
        be forfeited.
        <br />
        <br />
        5.7.2 If you do not want any Bonus which has been deposited into your
        account by the Casino then you are entitled to request that it be
        reversed out of your Casino account, subject to no Play Through having
        taken place on Bonus, the initial deposit and/or associated Welcome
        Bonus. You can do this by contacting Customer support on live chat. If
        any part of the Bonus has been used, then the Bonus may not be removed
        from your account (either by means of withdrawal or a request to the
        support staff) until the Play Through Requirement associated with the
        Bonus has been met.
        <br />
        <br />
        5.7.3 Where a Sign-Up Bonus has been granted to you, subject to you
        being required to have met all wagering requirements, you will be
        limited to a maximum withdrawal value of 6 times your first deposit
        amount and any remaining balance will be forfeited. This clause will
        only be applied at the discretion of casino management. All progressive
        wins are exempt from this clause.
        <br />
        <br />
        5.8. Before any withdrawals are processed, your play will be reviewed
        for any irregular playing patterns. In the interests of fair gaming,
        equal, zero or low margin bets or hedge betting, shall all be considered
        irregular gaming. Other examples of irregular game play include but are
        not limited to, placing single bets equal to or in excess of 30% or more
        of the value of the bonus credited to their account, until such time as
        the wagering requirements for that bonus have been met. For the purposes
        of this rule, a bet is defined as one roulette spin or one dealer's
        dealt hand in any table game, or one deal in any Video or Power Poker
        game (this includes Multi-Hand/Play games). Any double or gamble shall
        be considered a new bet. Should the Casino deem that irregular game play
        has occurred; the Casino reserves the right to withhold any withdrawals
        and/or confiscate all winnings.
        <br />
        <br />
        5.8.1 Play at certain games will contribute a different percentage of
        the playthrough requirement:
        <br />
        <br />
        100% All Slots (Excluding NetEnt slots & Progressive Jackpots), Keno &
        Scratch Card games (Re-spin slot games counts 10%)
        <br />
        50% NetEnt slot games
        <br />
        8% All table pokers, all roulettes, all video/power Pokers (excluding
        All Aces and Jacks or Better video pokers), all blackjacks (excluding
        Classic Blackjack) and Casino War
        <br />
        2% Classic Blackjacks, All Aces video pokers, all Jacks or Better video
        pokers
        <br />
        0% all baccarats, all craps, Red Dog, Sic Bo, Progressive Jackpots
        <br />
        If you play on the excluded games (0%) before meeting the playthrough
        requirements, then you agree that the casino holds the right to void any
        winnings made from these games at our discretion.
        <br />
        <br />
        Note: Playthrough (wagering) made using the Gamble Feature on all Slots
        or the Double Feature on all Video/Power Pokers will not count towards
        playthrough requirements.
        <br />
        <br />
        IMPORTANT: The contribution percentages and playthrough requirements may
        differ per promotion and/or geographical location. In this instance, the
        percentage amounts and playthrough requirements quoted in the
        promotion's Terms & Conditions will apply.
        <br />
        Please always refer to the specific Terms & Conditions associated with
        each promotion to avoid any misunderstanding.
        <br />
        <br />
        5.8.2 The Casino reserves the right to decide in its sole discretion
        which activities constitute "irregular play" and to withhold any
        withdrawals where irregular play has occurred.
        <br />
        <br />
        5.8.3 In the event that the Casino believes you are abusing or
        attempting to abuse a bonus or other promotion, displaying irregular
        betting behavior, or you are likely to benefit through abuse or lack of
        good faith from a gambling policy adopted by Us, the Casino Group may at
        its sole discretion, deny, withhold or withdraw from you any bonus or
        promotion, or rescind any policy either temporarily or permanently, or
        terminate your access to the Services and/or block your account. In such
        circumstances, the Casino shall be under no obligation to refund to you
        any funds that may be in your accounts other than your original deposit
        amounts.
        <br />
        <br />
        5.8.4 If you are found to be in breach of the warranty contained in
        clause 1.2 above, the Casino reserves the right, in its unfettered
        discretion, to void any winnings and confiscate any balance in a Casino.
        <br />
        <br />
        Failure to follow this condition may result in forfeiting any winnings.
        <br />
        <br />
      </p>

      <h2>6. RULES OF PLAY</h2>

      <p>
        6.1. In addition to these Rules, Terms and Conditions Certain Rules of
        Play and FAQ's shall apply to you and be binding upon you in respect of
        your participation at the Casino.
        <br />
        <br />
        6.2. You hereby agree to be bound by the aforementioned Rules of Play
        and FAQ's as if they were specifically incorporated into these Rules,
        Terms and Conditions.
        <br />
        <br />
        6.3. In the event of a payout being left in play on a Video Poker game,
        the Casino reserves the right to collect and subsequently credit the
        Player's balance with that amount.
        <br />
        <br />
        6.4. The casino reserves the right to confiscate any funds that may have
        been left in-play on any game (Excluding Video poker) for 90 days or
        longer.
        <br />
        <br />
        6.5. Winnings may be confiscated when a player has self-excluded
        themselves from gambling at other casinos due to gambling
        addiction/problems.
      </p>

      <h2>7. PAYMENT DETAILS / WITHDRAWALS</h2>

      <p>
        7.1. The Casino reserves the right to ask You for verification documents
        upon registration and / or prior to processing financial transactions.
        This includes, but is not limited to:
        <br />
        <br />
        Proof of income (if applicable)
        <br />
        Copy of photographic identification documents, such as a Passport or
        Driver's License
        <br />
        Documents confirming residence such as a bank statement or utility bill
        no older than 6 months
        <br />
        Proof of ownership for any payment method used to deposit or withdraw
        funds (if applicable)
        <br />
        Failure to send in any requested documentation may result in your
        account being terminated.
        <br />
        <br />
        7.2. The Casino reserves the right to run credit checks on all
        Cardholders with third party credit agencies on the basis of the
        information provided on registration.
        <br />
        <br />
        7.3. It is the Cardholder's responsibility to retain copies of
        transaction records and Website policies and rules. It is also the
        Cardholder's responsibility to know the laws concerning online gambling
        in the country of domicile.
        <br />
        <br />
        7.4. Any withdrawals that are made by bank wire or cheque will only be
        payable to the name used when registering with the site and if a debit
        or credit card has been used to deposit funds the name must correspond
        to the name registered on the card. There may be charges incurred for
        withdrawals. Funds must be withdrawn with the same method used for
        depositing, up to the amount of the deposit. Please note that any
        withdrawals may experience a slight delay due to our identity
        verification process.
        <br />
        <br />
        Note: in accordance with regulations established by our Regulators, the
        Casino is required to verify a player's identity upon single or
        cumulative transactions of €2,000 or more (or the equivalent value of
        the player's chosen currency).
        <br />
        <br />
        7.5. Updating or adding additional payment details may only be done by
        contacting Customer Service.
        <br />
        <br />
        7.6. Players who withdraw a sum of money that is 5 times or more,
        greater than their lifetime deposits across the Casino Group will be
        liable for detailed game and play review and only be able to withdraw
        their winnings at a sum of ₱5,000 per week. The remaining amount will be
        placed back in the player's account until such time that they are
        eligible for a further withdrawal. This clause will only be applied at
        the discretion of casino management. All progressive wins are exempt
        from this clause.
        <br />
        <br />
        7.7. Winnings are added in the selected currency for Your account to the
        cleared balance of Your account. Should You wish to withdraw some or all
        of Your balance You may select how much You wish to have paid back. The
        maximum withdrawal amount per 24-hour period is ₱10,000 or currency
        equivalent. If there are any concerns or queries regarding the
        collection of winnings, please contact us directly.
        <br />
        <br />
        7.8. In order to comply with Anti-Money Laundering obligations all
        withdrawals are screened to prevent money laundering or other types of
        fraudulent and/or criminal activity. During this period [Rolling 24
        hours from initiating your withdrawal – No withdrawal processing over
        weekends] withdrawals will be held in a pending state, during which the
        balance is accessible to the players and can be reversed, thereafter it
        will go for processing. Until such time as it has been released for
        processing, the funds will be deemed to be part of the cash balance of
        the casino account. We reserve the following rights consistent with our
        duties as a Gaming Operator and in accordance with applicable law:
        <br />
        <br />
        7.8.1 to withhold payment of your real money balance and to ask
        additional verification questions and/or for documents, such as, but not
        limited to, the source of any funds placed on deposit by you, proof of
        age documentation as well as any further evidence to verify your
        identity;
        <br />
        <br />
        7.8.2 to return any non-wagered deposits or deposits balance to the
        originating deposit method or, where this is not possible, to a bank
        account held in your name with a description of the transaction as we
        deem fit; <br />
        <br />
        7.8.3 to close or block your Player Account(s) indefinitely without
        providing you with reasons and to report you to the relevant authorities
        <br />
        <br />
        7.9 Our withdrawal terms and conditions can be accessed on the following
        link: Withdrawal Terms
        <br />
        <br />
        7.10 Depending on the payment mechanism used, some funds might be
        collected and processed by Digi Processing Limited on behalf of the
        Casino, its group or related companies. Digiprocessing Limited (110368),
        a Gibraltar registered company with registered address Suite 1, Burnes
        House, 19 Town Range, Gibraltar GX11 1AA.
      </p>

      <h2>8. RESPONSIBLE GAMING/GAMBLING</h2>

      <p>
        8.1. Gaming is supposed to be fun but can be addictive. We promote
        responsible gaming by:
        <br />
        -Enabling the blocking / suspension of accounts upon request
        <br />
        -Allowing You to contact one of our Player Support Representatives or
        click through to one of the links provided in the Responsible Gaming
        page.
        <br />
        <br />
        8.2. For full details about the Group's Self-Exclusion Policy, please
        refer to the Responsible Gaming Page
        <br />
        <br />
        8.3 Although every effort will be made to action your request via email
        within a reasonable period of time please bear in mind there may be a
        slight delay to action. The casino is not liable for losses due to
        pending communications.
        <br />
        <br />
        For queries requiring immediate attention please contact Customer
        services via live chat.
      </p>

      <h2>9. INTELLECTUAL PROPERTY</h2>

      <p>
        9.1. We hereby grant you a revocable, non-exclusive, non-transferable
        right to use the Casino Website and the Software and all content derived
        from the Casino Website and the Software, including copyright and all
        intellectual property rights therein, in connection with the Service in
        accordance with these Rules, Terms and Conditions.
        <br />
        <br />
        9.2. You acknowledge and agree that all copyright, trademarks and all
        other intellectual property rights in all material or content supplied
        as part of the Casino Website and the Software shall remain at all times
        vested in us or our licensors. You are permitted to use this material
        only as expressly authorized by us or our licensors.
        <br />
        <br />
        9.3. You acknowledge and agree that the material and content contained
        within the Casino Website is made available for your personal
        non-commercial use only and that you may download such material and
        content onto only one computer hard drive for such purpose. Any other
        use of such material and content is strictly prohibited. You agree not
        to (and agree not to assist or facilitate any third party to) copy,
        reproduce, transmit, publish, display, distribute, commercially exploit,
        tamper with, or create derivative works of such material and content.
      </p>

      <h2>10. GENERAL</h2>

      <p>
        10.1. AMENDMENT
        <br />
        <br />
        10.1.1. The Casino may, without notice to you, amend, alter, delete,
        interlineate or add to ("Changes") these Rules, Terms and Conditions,
        the promotion or competition-specific Rules, Terms and Conditions or
        Rules of Play at any time whatsoever.
        <br />
        <br />
        10.1.2. These Changes shall become effective, and you shall be bound by
        these Changes, immediately upon their posting on the Casino Website.
        <br />
        <br />
        10.1.3. You agree to regularly review these Rules, Terms and Conditions,
        promotion or competition-specific Rules, Terms and Conditions and the
        Rules of Play regularly in order to assess whether any changes have been
        made.
        <br />
        <br />
        10.2. ELIGIBILITY
        <br />
        <br />
        The Casino’s employees, subsidiaries and affiliates connected to any
        referral programs linked to the Casino, advertising or other agencies,
        licensees, licensors, distributors and their other associated or
        affiliated companies or, in the case of individuals, the immediate
        family of such individuals, are not eligible to participate at the
        Casino as a Real Player.
        <br />
        <br />
        10.3. SEVERABILITY
        <br />
        <br />
        If any part of these Rules, Terms and Conditions is deemed unlawful,
        void or for any reason unenforceable, then that part shall be deemed to
        be severable from the rest of these Rules, Terms and Conditions and
        shall not affect the validity and enforceability of the remaining
        provisions of these Rules, Terms and Conditions. In such cases, the part
        deemed invalid or unenforceable shall be amended in a manner consistent
        with applicable law to reflect, as closely as possible, our original
        intent.
        <br />
        <br />
        10.4. NON-WAIVER
        <br />
        <br />
        No indulgence granted by the Casino to you should be construed as a
        waiver of any of our or the Casino’s rights in terms of these Rules,
        Terms and Conditions.
        <br />
        <br />
        10.5. THIRD PARTIES
        <br />
        <br />
        Unless otherwise expressly stated, nothing in these Rules, Terms and
        Conditions shall create or confer any rights on any persons not party to
        these Rules, Terms and Conditions.
        <br />
        <br />
        10.6. ACCEPTANCE
        <br />
        <br />
        By accepting these Terms and Conditions You are fully aware that there
        is a risk of losing money when gambling by means of the Website and You
        are fully responsible for any such loss. You agree that Your use of the
        Website is at Your sole option, discretion and risk. In relation to Your
        Losses You shall have no claims whatsoever against the Casino or any
        white label partner or their respective directors, officers or
        employees.
        <br />
        <br />
        10.7. WHOLE AGREEMENT
        <br />
        <br />
        Unless the context otherwise indicates, these Rules, Terms and
        Conditions set out the entire agreement between us and supersede all
        prior oral or written agreements, arrangements or understandings between
        us. You acknowledge that you are not relying on any representation,
        agreement, term or condition that is not set out in this Agreement.
        <br />
        <br />
        10.8. INTERPRETATION
        <br />
        <br />
        In this Agreement the headings are used for convenience only and shall
        not affect its interpretation. References to persons shall include
        incorporated and unincorporated persons; references to the singular
        include the plural and vice versa; and references to the masculine
        include the feminine.
        <br />
        <br />
        10.9. GOVERNING AUTHORITY
        <br />
        <br />
        This Casino is regulated by the provisions of the Philippine Amusement
        and Gaming Corporation (PAGCOR) in the case of Filipino players, and the
        Government of Philippine in the case of players from elsewhere in the
        world. Filipino players acknowledge and agree that we may be bound (and
        shall be entitled) to disclose certain information about you and your
        account to the PAGCOR in terms of such laws and regulations. Players
        from elsewhere in the world acknowledge that we may be bound (and shall
        be entitled) to disclose certain information about you and your account
        to the Philippine Gaming Authorities in terms of such laws and
        regulations.
        <br />
        <br />
        10.10. APPLICABLE LAW & JURISDICTION
        <br />
        <br />
        In the case of Filipino players, the validity, construction and
        performance of this Agreement shall be governed by the laws of
        Philippine and shall be subject to the non-exclusive jurisdiction of
        these superior courts to which the parties hereby submit, except that a
        Party may seek an interim injunction in any court of competent
        jurisdiction.
        <br />
        <br />
        In the case of players from elsewhere in the world, the validity,
        construction and performance of this Agreement shall be governed by
        Philippine law and shall be subject to the non-exclusive jurisdiction of
        the Philippine superior courts to which the parties hereby submit,
        except that a Party may seek an interim injunction in any court of
        competent jurisdiction
        <br />
        <br />
        10.11. LIMITATION OF ACTIONS
        <br />
        <br />
        You hereby agree that any legal proceedings to enforce any claim that
        you may have (if any) against the Casino shall be initiated by you
        within a period of 6 (six) months of the cause of action arising (the
        "Prescription Period"); failing which you hereby forever waive and
        abandon any right that you may have to enforce such claim after the
        Prescription Period and confirm that on the expiry of the Prescription
        Period the said claim shall be void, waived and abandoned in law.
        <br />
        <br />
        10.12. TRANSLATIONS
        <br />
        <br />
        These Rules, Terms and Conditions may be translated into many different
        languages. If there is any discrepancy between the English language
        version of these Rules, Terms and Conditions and any other language-
        version of these Rules, Terms and Conditions in the meaning and
        interpretation of any of the provisions of these Rules, Terms and
        Conditions, the meaning and interpretation of the provisions under the
        English language version shall prevail.
        <br />
        <br />
        10.13 TOURNAMENTS
        <br />
        <br />
        10.13.1 Entrance into the tournament is limited to one per person per
        Casino account. If Player's open multiple accounts, they will not be
        eligible for an entry per account. Entry is only available once per
        Player and/or per environment where computers are shared and/or per
        e-mail address. Only one Alias is permitted per Player per tournament.
        <br />
        <br />
        10.13.2 Upon withdrawal, any winnings from the Tournament Free Rolls
        prior to a cash deposit will be capped at 100 Casino Credits (in the
        Player's currency of play) and the remaining cash balance will be
        forfeited.
        <br />
        <br />
        10.14 COMPLAINTS AND DISPUTES
        <br />
        <br />
        Any customer who has any concerns, questions or complaints regarding the
        Casino or regarding a settlement should contact Customer services via
        live chat, email. Customers with unresolved complaints may raise a
        formal complaint within 6 months of the issue occurring.
        <br />
        <br />
        To ensure Your complaint/concern is dealt with promptly please email the
        following email address and include the following information:
        <br />
        <br />
        Your Username/ Account number
        <br />
        First and Last name
        <br />
        Detailed Explanation of complaint/concern
        <br />
        Any other information specific to the complaint/concern including any
        evidence (If applicable)
        <br />
        Please send the above information to service@youremail.com
        <br />
        <br />
        You have 4 weeks in which to reply to a complaint, failure to do so will
        automatically resolve your query. You will then be required to re-log
        your complaint should you wish to continue the process.
        <br />
        <br />
        10.15 ASSIGNMENT
        <br />
        <br />
        These Terms and Conditions are personal to you, and are not assignable,
        transferable or sub licensable by you except with our prior written
        consent. We reserve the right to assign, transfer or delegate any of our
        rights and obligations hereunder to any third party without notice to
        you.
        <br />
        <br />
        10.16 BUSINESS TRANSFERS
        <br />
        <br />
        In the event of a change of control, merger, acquisition, or sale of
        assets of the company, your player account and associated data may be
        part of the assets transferred to the purchaser or acquiring party. In
        such an event, we will provide you with notice via email or notice on
        our web site explaining your options with regards to the transfer of
        your account.
        <br />
        <br />
        10.17 TERMINATION OF ACCOUNT
        <br />
        <br />
        The Casino reserves the right to cancel Your account for any reason
        whatsoever at any time without notice to You. Any balance in Your
        account at the time of such cancellation will be credited to Your credit
        card and/or sent to You by cheque. However, the Casino reserves the
        right, in its unfettered discretion, to void any winnings and confiscate
        any balance in a Casino account in any of the following circumstances:
        <br />
        <br />
        i. If You have more than one active account for the Casino;
        <br />
        <br />
        ii. If the name on Your Casino account does not match the name on the
        credit card(s) used to make deposits on a Casino account;
        <br />
        <br />
        iii. If You participate in a Casino promotion and cash-in before
        fulfilling the requirements of that particular promotion;
        <br />
        <br />
        iv. If You provide incorrect or misleading registration information;
        <br />
        <br />
        v. If You are not of legal age;
        <br />
        <br />
        vi. If You reside in a jurisdiction where participation in Casino games
        is prohibited by law;
        <br />
        <br />
        vii. If You have allowed or permitted (intentionally or unintentionally)
        someone else to play on Your Casino account;
        <br />
        <br />
        viii. If You have not played at the Casino on an individual basis for
        personal entertainment only (that is, You have played in a professional
        sense or in concert with other Player(s) as part of a club, group,
        etc.);
        <br />
        <br />
        ix. If the casino has received charge backs or returns via a deposit
        mechanism used on your account;
        <br />
        <br />
        x. If You are found colluding, cheating, money laundering or undertaking
        fraudulent activity;
        <br />
        <br />
        xi. If it is determined by the Casino that You have employed or made use
        of a system (including machines, computers, software or other automated
        systems) designed specifically to defeat the Casino;
        <br />
        <br />
        xii. If You use the Website or Your account in bad faith;
        <br />
        <br />
        xiii. If You make statements that are sexually explicit or offensive in
        any of our customer support channels, including expressions of bigotry,
        racism, sexism, harassment of any nature, hatred, profanity or threats
        of violence;
        <br />
        <br />
        xiv. If the Casino should become aware that You have played at any other
        on-line casino under any of the circumstances set out at (i) to (xiii)
        above.
        <br />
        <br />
        10.17.1 ACCOUNT CLOSURE
        <br />
        <br />
        If you wish to close Your account, please contact Customer Services
        directly.
        <br />
        <br />
        10.18 FINAL DECISION OF CASINO
        <br />
        <br />
        In the event of a discrepancy between the result showing on Your Casino
        software and the Casino's server software, the result showing on the
        Casino's server software shall be the official and governing result.
        <br />
        <br />
        10.19 CURRENCY
        <br />
        <br />
        The use of the $ symbol indicates US Dollars only, the use of the ₱
        symbol indicates Philippine Peso only, the use of the £ symbol indicates
        Great Britain Pounds only and the use of the € symbol indicates Euros
        only.
        <br />
        <br />
        10.20 FORCE MAJEURE
        <br />
        <br />
        The Casino shall not be liable or responsible for any failure to
        perform, or delay in performance of, any of our obligations under the
        Terms of Use that is caused by events outside our reasonable control.
        <br />
        <br />
        10.21 NO AGENCY
        <br />
        <br />
        Nothing in these Terms and Conditions shall be construed as creating any
        agency, partnership, trust arrangement, fiduciary relationship or any
        other form of joint enterprise between You and us.
        <br />
        <br />
        10.22 EXPLANATION OF TERMS AND CONDITIONS
        <br />
        <br />
        We consider these Terms and Conditions to be fair. Should You need any
        advice regarding these or any other part of our service, please contact
        us directly. In the interests of both our Players and the Casino, please
        note that all correspondence and telephone calls may be recorded.
      </p>

      <h2>11. MOBILE CASINO</h2>

      <p>
        When playing on the Mobile Casino the following additional terms shall
        apply:
        <br />
        <br />
        11.1 NETWORK OPERATOR AND OTHER CHARGES
        <br />
        <br />
        You are solely responsible for any connection, use or other charges
        levied by your network operator when you register to play the Games,
        download the Software, place Bets or communicate with us. These charges
        shall form no part of any Bets placed.
        <br />
        <br />
        11.2 CONNECTIVITY
        <br />
        <br />
        You (the Player) are solely responsible for any telecommunications
        devices, networks, GPRS, Internet access services and other consents and
        permissions required in connection with your use of the Casino.
      </p>
    </Container>
  );
}

export function PrivacyPolicy(props) {
  return (
    <Container>
      <h1>PRIVACY POLICY</h1>
      <p>Last revised: 2022/12/09</p>
      <h2>INTRODUCTION</h2>
      <p>
        {getBrand()}, including its affiliates (collectively, the "{getBrand()}
        "), offers online gambling services through websites, mobile apps and
        other online properties (collectively, the “Services”).
        <br />
        <br />
        {getBrand()} is deeply committed to safeguarding the privacy
        expectations of its users (“User(s)”, “you” or “your”). Accordingly, we
        have put in place this Privacy Policy, which outlines our data
        protection practices, including how we collect, use, disclose and
        protect your Personal Information, as well as your rights with respect
        to your Personal Information.
        <br />
        <br />
        We encourage you to read the Privacy Policy carefully and use it to make
        informed decisions. By visiting the {getBrand()}
        ’s websites, mobile apps or other online properties, or by creating an
        account through our Services, you hereby agree to the Privacy Policy.
        <br />
        <br />
        If you have any questions (or comments) concerning your information, or
        this Privacy Policy, you are welcome to contact our Data Protection
        Officer at: service@youremail.com
      </p>
      <h2>WHAT INFORMATION WE COLLECT?</h2>
      <p>
        We collect two types of information from our Users:
        <br />
        <br />
        Personal Information
        <br />
        The first type of information is information that identifies or may
        reasonably identify an individual with reasonable effort (“Personal
        Information”). Personal Information which is being gathered may consist
        of the following:
        <br />
        <br />
        Registration details: When you open an account and register to use the
        Services, you will be asked to provide us with certain details about
        yourself, such as: first and last name, email address, gender, birth
        data, physical address, ID number, phone number, occupation, etc.
        <br />
        Governmental-issued ID: In certain instances, you will be required to
        provide a copy of a governmental-issued ID, for the identity
        verification process. Please note that this information is required for
        certain features of our Services.
        <br />
        Payment information: In order for you to enjoy all of the functions of
        the Services (e.g. place bets, perform purchases, play in tournaments,
        etc.), payment information will be collected from you, such as your
        credit card number and bank account details.
        <br />
        Voluntary information: We also collect information which you provide us
        voluntarily. For example, when you respond to communications from us,
        communicate with us via email or share additional information about
        yourself through your use of the Services, such as on the chat feature
        and in games.
        <br />
        Device information: We collect specific types of connection details and
        information with regard to your device, software or hardware that may
        identify you, such as: device’s unique identifiers (e.g. UDID, IMEI, MAC
        address), browser fingerprinting, IP address and geo-location data.
        <br />
        Telephone calls: We record or monitor telephone calls for customer
        support, training and/or security purposes.
        <br />
        Social networks: When you register through your social network account
        (such as your Facebook account), to use the Services or connect your
        player account with such account, we will have access to basic
        information from your social network account, such as your name,
        birthdate, profile picture and friends' list, as well as information you
        made publicly available on such account.
        <br />
        In addition, when using the Services, you may be able via your social
        network to "Invite a Friend" to use the Services. Should the person
        accept your invitation, we may obtain Personal Information from him/her
        such as: name, email address, phone number and date of birth. We will
        use the Personal Information for the purposes set out herein and
        disclose such information only to third parties as detailed in this
        Privacy Policy.
        <br />
        Information we collect from third parties: We collect Personal
        Information from third party service providers, such as information
        about your credit history from credit agencies and other financial
        information which is relevant to the provision of the Services, as well
        as information which is gathered in order to verify your identity and
        prevent fraudulent or illegal activity.
      </p>

      <h2>Non-personal information</h2>
      <p>
        The second type of information is un-identified and non-identifiable
        information pertaining to a User(s), which may be made available or
        gathered via the User’s use of the Services (“Non-Personal
        Information”).
        <br />
        <br />
        Non-Personal Information which is being collected consists of technical
        information and aggregated usage information, and may contain, among
        other things, the User’s operating system, type of browser, screen
        resolution, browser and keyboard language, the User’s ‘click-stream’ and
        activities on the Services, the period of time the User visited the
        Services and related timestamps, etc.
        <br />
        <br />
        For avoidance of doubt, any Non-personal Information connected or linked
        to any Personal Information shall be deemed as Personal Information as
        long as such connection or linkage exists.
        <br />
        <br />
        Types of Non-personal Information we collect from or about you:
        <br />
        <br />
        Technical information: In order to enhance the functionality of the
        Services and to provide you with a better user experience, we collect
        technical information transmitted by your device, including certain
        software and hardware information (e.g. the type of browser and
        operating system your device uses, language preference, access time and
        the domain name of the website from which you linked to the Services;
        etc.).
        <br />
        Gameplay information: We record game play information including, amongst
        other things, your deposits, bets, bonuses, game session duration and
        your high scores. We may also share and publish such information through
        any of our Platforms.
        <br />
        Device and connection information: If you download the Software to your
        device, we may collect information from the particular device you are
        using, for security and fraud detection and prevention purposes. For
        example, we may gather information with regard to other software which
        is running simultaneously with the Software for detecting if you are
        using software which is associated with fraudulent activity (e.g.
        robots, malware, etc.) or checking if the connection you are using is
        via a VPN or proxy.
        <br />
        Analytics information: We collect information about your use of the
        Services, such as applications' usage, log files, user activity (e.g.
        pages viewed, the amount of time spent on particular pages, online
        browsing, clicks, actions, etc.), time stamps, alerts, etc. This
        information is collected for amongst other things troubleshooting errors
        and bugs as well as for research and analytics purposes about your use
        of the Services.
        <br />
        Anonymous information: We may anonymize or de-identify the information
        collected by the Services or via other means so that the information
        cannot, on its own, personally identify you. Our use and disclosure of
        such aggregated or de-identified information is not subject to any
        restrictions under this Privacy Policy, and we may disclose it to others
        without limitation and for any purpose, such as for advertising or
        marketing purposes.
        <br />
        MINORS
        <br />
        The Services are not designed or directed to persons under the age of 18
        or persons under the age of legal consent with respect to the use of the
        Services of any jurisdiction, whichever is higher (“Legally of Age”). If
        you are not Legally of Age, you should not download or use the Services
        nor provide any Personal Information to us.
        <br />
        <br />
        We reserve the right to access and verify any Personal Information
        collected from you. In the event that we become aware that a user who is
        not Legally of Age has shared any information, we may discard such
        information. If you have any reason to believe that a minor has shared
        any information with us, please contact us.
      </p>

      <h2>HOW WE USE THE COLLECTED INFORMATION?</h2>
      <p>
        We use your Personal Information for the purposes listed below:
        <br />
        <br />
        To set up, manage and update your account;
        <br />
        To provide and operate the Services (such as for betting and payment
        processing);
        <br />
        To communicate with you and to keep you informed of our latest updates
        to our Services and special offers;
        <br />
        To market our Services (see more below under “Marketing”), as well as to
        serve you advertisements, including behavioral advertising;
        <br />
        To conduct analytics, statistical and research purposes, in order to
        improve and customize the Services to your needs and interests (such as
        by compiling aggregated reports about the usage of certain features of
        our Services);
        <br />
        For Customer Relationship Management purposes, and to support and
        troubleshoot the Services and to respond to your queries;
        <br />
        To enable us to further develop, customize and improve the Services
        based on Users’ common preferences and uses;
        <br />
        To provide you with a responsible gaming environment;
        <br />
        To communicate with your and to process any of your requests to exercise
        your User Rights;
        <br />
        To identify and authenticate your access to certain features of the
        Services;
        <br />
        To detect and prevent fraudulent and illegal activity or any other type
        of activity that may jeopardize or negatively affect the integrity of
        the Services, including by identifying risks associated with your
        activity on our Services;
        <br />
        To investigate violations of our policies and User Agreement as well as
        enforce our policies and the User Agreement;
        <br />
        To investigate and resolve disputes in connection with your use of the
        Services; and
        <br />
        As required by law or regulation (such as Know Your Customer ("KYC") and
        Anti-Money Laundering regulatory requirements), or as required by other
        governmental authorities, or to comply with a subpoena or similar legal
        process or respond to a government request.
      </p>

      <h2>MARKETING</h2>

      <p>
        {getBrand()} will use your Personal Information, such as your name, home
        address, email address, telephone number etc., ourselves or by using our
        third party subcontractors for the purpose of providing you with
        promotional materials, concerning the Services as well as products,
        services, websites and applications, which we believe may interest you.
        <br />
        <br />
        We may also share and disclose Personal Information with our Marketing
        Affiliates for the purpose of providing you different marketing offers,
        which we, or our Marketing Affiliates, believe are relevant for you. Our
        Marketing Affiliates may use this Personal Information for different
        marketing techniques, such as direct email, post, SMS and telephone
        marketing purposes.
        <br />
        <br />
        You may update your marketing preferences at any time through Customer
        Services (where available). When you choose to download Software
        pursuant to our Services, notification software may also be downloaded
        onto your device. This allows us to send notifications to you about our
        Services directly to your device, for example to inform you about new
        features, updates, service communications, offers and promotions.
        <br />
        <br />
        You may at any time decline receiving further marketing offers from us
        or from our business partners and marketing affiliates by contacting via
        Live Chat. Please note that even if you unsubscribe from our marketing
        mailing list, we may continue to send you service-related updates and
        notifications.
      </p>

      <h2>WITH WHOM WE SHARE INFORMATION?</h2>

      <p>
        We do not rent, sell, or share your Personal Information with third
        parties (“Recipients”) except as described in this Privacy Policy. The
        Personal Information will be disclosed to Recipients only to the extent
        required for the specific purpose, as stipulated in this Privacy Policy.
        <br />
        <br />
        We share Personal Information with any of the following recipients:
        <br />
        White Label Brands, including any replacement service provider that the
        White Label Brand may engage to operate the White Label Brands (if
        applicable);
        <br />
        Companies within {getBrand()} and other affiliated companies;
        <br />
        Subcontractors and third party service providers, as well as their
        subcontractors, which by way of example include (but is not limited to)
        cloud computing companies, marketing affiliates, identity verification
        and fraud prevention services, and other data verifiers;
        <br />
        Credit reporting agencies;
        <br />
        Payment service providers, payment processors and banks;
        <br />
        To any third parties who provide services in relation to the operation
        or promotion of the applicable In House Brand or the White Label Brands
        (if applicable);
        <br />
        To any third parties who organize offline events or tournaments on
        behalf of or in conjunction with any companies within {getBrand()};
        <br />
        To hotels and flight companies (such as in the context of offline events
        and promotions);
        <br />
        Auditors, contractors or advisers of any of {getBrand()}’s business
        processes;
        <br />
        To any third parties who investigate, detect or prevent fraudulent or
        illegal activity (e.g. governmental authorities, police, banks and other
        investigatory organizations);
        <br />
        Licensing authorities, governmental and regulatory bodies, in accordance
        with applicable laws and regulations; and
        <br />
        Potential purchasers or investors in any of the companies within the
        Group or While Label Brand (if applicable), or in the event of a
        corporate transaction (e.g. sale of a substantial part of our business,
        merger, reorganization, bankruptcy, consolidation or asset sale of an
        asset or transfer in the operation thereof) in relation to any company
        within {getBrand()} (in such event, the acquiring company or transferee
        will assume the rights and obligations as described in this Privacy
        Policy).
        <br />
        In addition to the purposes listed in this Privacy Policy, we share
        Personal Information with those Recipients for any of the following
        purposes:
        <br />
        <br />
        Storing such information on our behalf, for example by using cloud
        computing service providers;
        <br />
        Processing such information to assist us with our business operations
        (e.g. to process payments and your deposits; authenticate your access;
        auditing our operations; detect and prevent fraudulent or illegal
        activity; etc.);
        <br />
        Performing research, technical diagnostics or analytics;
        <br />
        Communicating targeted advertising, as well as promotional and
        informational materials, in accordance with our marketing policy (see
        below, under "Marketing"); and
        <br />
        Whenever we believe in good faith that disclosure is necessary to
        protect our rights or legal claims, enforce our policies, protect your
        safety or the safety of others, as well as to investigate or prevent any
        fraud, for security reasons or to help us with any other related
        technical issue.
        <br />
        <br />
        We use best efforts to ensure that your Personal Information is
        protected in accordance with our privacy policy, through contractual
        means (such as by using the contractual clauses approved by the relevant
        regulators for data transfer) or other means (such as ensuring that the
        jurisdiction imposes adequate safeguards for data protection).
        <br />
        <br />
        If you feel that your privacy was treated not in accordance with our
        policy, or if any person attempted to abuse the Services or acted in an
        inappropriate manner, please contact us directly via Live Chat.
      </p>

      <h2>THIRD PARTY TRACKING TECHNOLOGIES</h2>
      <p>
        When you visit or access our Services (for example when you visit our
        websites), we use (and authorize third parties to use) web beacons,
        cookies, pixels, scripts, tags and other technologies ("Tracking
        Technologies").
        <br />
        <br />
        The Tracking Technologies allow us to automatically collect information
        about you and your online behavior, as well as your device (for example
        your computer or mobile device), for different purposes, such as in
        order to enhance your navigation on our Services, improve our Services’
        performance and customize your experience on our Services. We also use
        this information to collect statistics about the usage of our Services,
        perform analytics, deliver content which is tailored to your interests
        and administer services to our Users, advertisers, publishers, customers
        and partners.
        <br />
        <br />
        We also allow third parties to collect information about you through
        Tracking Technologies. To learn more please visit our Cookie Policy.
        <br />
        <br />
      </p>

      <h2>THIRD PARTY SERVICES</h2>

      <p>
        While using the Services you may encounter links to third party
        websites, services or applications. Please keep in mind that this
        Privacy Policy does not apply to any third party websites, services or
        applications, even if they are accessible, downloadable, or otherwise
        distributed through the Services.
        <br />
        <br />
        Please be advised that such third party websites, services or
        applications are independent from {getBrand()}. We assume no
        responsibility or liability whatsoever with regard to privacy matters or
        any other legal matter with respect to such third party websites and/or
        services. We encourage you to carefully read the privacy policies and
        the terms of use of such third party websites and/or services, as their
        terms, not ours, will apply to any of your interactions with such third
        parties.
        <br />
        <br />
        You should always review their privacy practices carefully before
        providing Personal Information to such third parties.
        <br />
        <br />
        You are knowingly and voluntarily assuming all risks of using any
        third-party websites, services or applications. You agree that we shall
        have no liability whatsoever with respect to such third party sites and
        your usage of them.
      </p>

      <h2>RETENTION OF PERSONAL INFORMATION</h2>
      <p>
        If you have registered with an account through our Services,{" "}
        {getBrand()} will retain your Personal Information during the period
        your account is active. In addition, {getBrand()} will retain your
        Personal Data for additional periods, to enable {getBrand()} to meet its
        legal obligations under applicable laws or regulations, such as the
        applicable gambling regulations, Know-Your-Customer and Anti-Money
        Laundering regulations.
        <br />
        <br />
        In addition, {getBrand()} may retain your Personal Information for
        longer periods, provided that retaining such information is necessary
        for {getBrand()}’s legitimate interests, such as fraud prevention and
        record keeping.
        <br />
        <br />
        If for any reason you wish to delete your Personal Information, please
        send us an e-mail to service@youremail.com, and we will make reasonable
        efforts to address your request.
      </p>

      <h2>YOUR RIGHTS</h2>

      <p>
        You may contact us at any time by email, and request:
        <br />
        <br />
        To access or delete any Personal Information relating to you
        <br />
        To change or update any Personal Information relating to you (for
        example, if you believe that your Personal Information is incorrect, you
        may ask to have it corrected or deleted). Note that you may also request
        that we will correct errors with regard to your Personal Information
        (except in cases where the information is required to be kept in its
        original format under any applicable laws and regulations);
        <br />
        That we will restrict or cease any further use of your Personal
        Information;
        <br />
        That we will provide the Personal Information you volunteered to us in a
        machine-readable format.
        <br />
        Please note that these rights are not absolute and requests are subject
        to any applicable legal requirements, including gambling regulations and
        other legal and ethical reporting or document retention obligations. We
        may also rectify, replenish or remove incomplete or inaccurate
        information, at any time and at our own discretion, in accordance with
        our internal policies.
      </p>

      <h2>HOW WE KEEP YOUR INFORMATION SECURED</h2>
      <p>
        The security of your personal information is extremely important. We
        maintain commercially reasonable technical, administrative, physical,
        electronic, and procedural safeguards to protect the confidentiality and
        security of personal information provided to us.
        <br />
        <br />
        We will take all steps reasonably necessary to ensure that your data is
        treated securely and in accordance with this Privacy Policy. However, no
        communication over the Internet can be guaranteed to be completely
        secure. Although we take care to protect your personal information, we
        cannot guarantee or warrant the security of any information you provide
        to us, so you do so at your own risk.
        <br />
        <br />
        The security of your information with us is also dependent on you.
        Please keep any account information, including access to your mobile
        phone secure. You are responsible for maintaining the confidentiality of
        your account information.
      </p>

      <h2>CHANGES TO THE PRIVACY POLICY</h2>

      <p>
        Any changes we may make to our Privacy Policy in the future will be
        posted on this page and on our Website. Please check this page
        occasionally to ensure you are happy with any changes.
      </p>

      <h2>HOW TO CONTACT US</h2>

      <p>
        If you have any general questions about the Services or the information
        that we collect about you and how we use it, please contact us via our
        chat facility on our contact us page.
      </p>
    </Container>
  );
}

export function ResponsibleGaming(props) {
  console.log("here");
  return (
    <Container>
      <h1>Responsible Gaming</h1>
      <p>
        {getBrand()} is committed to being the very best online entertainment
        group in the world. This means doing everything possible to give our
        players an enjoyable, responsible and safe gaming experience.
        <br />
        <br />
        {getBrand()} fully supports responsible gaming and to ensure that you
        continue to enjoy safe and manageable play, please bear the following in
        mind:
        <br />
        1. Gambling should be seen as entertainment and not as a means to make
        money;
        <br />
        2. Keep track of the time and money you spend while gambling.
        <br />
        <br />
        We have also implemented the following strict rules to ensure a
        responsible gaming environment:
      </p>

      <h2>Underage Gaming</h2>

      <p>
        Playing with us is restricted to persons over the age of 18, or the
        legal age of majority in their jurisdiction, whichever is greater.
      </p>

      <h2>Player Self-Exclusion</h2>
      <p>
        If you are concerned about your gambling behavior, you may choose to
        lock your gaming account. During this time, we will also take all
        reasonable steps to ensure you do not receive any promotional material.
        <br />
        <br />
        If you are concerned about your gambling behavior, please consider one
        of the following options:
        <br />
        a. A minimum of 24 hours “Take a break” period
        <br />
        b. A minimum six (6) month self-exclusion period
      </p>
      <h2>Deposit Limits</h2>
      <p>
        Players also have the option of adjusting their maximum deposit limits
        at any time.
        <br />
        Limits can be set for the following periods:
        <br />
        a. Daily
        <br />
        b. Weekly
        <br />
        c. Monthly
        <br />
        To change your deposit limits or to request exclusion, please contact
        our 24/7 Support Team.
        <br />
        <br />
        If you are worried about your gaming behavior, please visit the
        following links for professionals to assist you.
        <br />
        Gambling Therapy:{" "}
        <a href="www.gamblingtherapy.org">www.gamblingtherapy.org</a>
        <br />
        Responsible Gambling Council:{" "}
        <a href="www.responsiblegambling.org">www.responsiblegambling.org</a>
      </p>
      <h2>
        Please enjoy gaming responsibly.
        <br />
        <br />
        Responsible Gaming, Stay in control.
      </h2>
    </Container>
  );
}
