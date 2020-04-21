import React from "react";
import { createConfig } from '@stitches/css'
import { createStyled } from "@stitches/styled";

const config = createConfig({
  screens: {
    screenA: rule => `@media (min-width: 600px) { ${rule} }`,
    screenB: rule => `@media (min-width: 800px) { ${rule} }`,
    screenC: rule => `@media (min-width: 992px) { ${rule} }`,
    screenD: rule => `@media (min-width: 1200px) { ${rule} }`,

  }
})

const { styled, Provider } = createStyled<typeof config>()

export {
  Provider,
  config
}
 
/* CSS from https://codepen.io/nemophrost/pen/EkImb */

const Cell = styled.div(css => css.compose(
  css.float('left'),
  css.position('relative'),
  css.width('5.55%'),
  css.height('100%'),
  css.color('rgba(0, 0, 0, 0.1)', ':hover .element'),
  css.transform('scale(3, 3)', ':hover .element'),
  css.borderColor('rgba(0, 0, 0, 0.1)', ':hover .element'),
  css.zIndex(1, ':hover .element'),
  css.backgroundColor('rgba(0, 128, 128, 0.9)', ':hover .element')
))

const colors = {
  'c1': 'rgba(0, 128, 128, 0.6)',
  'c2': 'rgba(0, 160, 96, 0.6)',
  'c3': 'rgba(0, 192, 64, 0.6)',
  'c4': 'rgba(64, 192, 0, 0.6)',
  'c5': 'rgba(0, 96, 160, 0.6)',
  'c6': 'rgba(0, 160, 96, 0.9)',
}

const ElementWrapper = styled.div({
  color: 'c1'
}, (css, { color }) => css.compose(
  css.position('absolute'),
  css.top(0),
  css.left(0),
  css.bottom('1px'),
  css.right('1px'),
  css.boxSizing('border-box'),
  css.boxShadow('0px 0px 4px rgba(255, 255, 255, 0.5)'),
  css.borderWidth('1px'),
  css.borderStyle('solid'),
  css.borderColor('rgba(0, 0, 0, 0.05)'),
  css.textAlign('center'),
  css.cursor('default'),
  css.pointerEvents('none'),
  css.transitionProperty('all'),
  css.transitionDuration('200ms'),
  css.transitionTimingFunction('ease'),
  css.backgroundColor(colors[color]),
))


const ElementNumber = styled.div(css => css.compose(
  css.position('absolute'),
  css.fontSize('4px'),
  css.color('rgba(255, 255, 255, 0.5)'),
  css.opacity(0),
  css.top('4px'),
  css.right('5px'),
  css.screenA.fontSize('4px'),
  css.screenA.opacity(1),
  css.screenC.fontSize('5px'),
  css.screenD.fontSize('6px')
))


const ElementSymbol = styled.div(css => css.compose(
  css.position('absolute'),
  css.top('50%'),
  css.left(0),
  css.right(0),
  css.marginTop('-4px'),
  css.fontSize('9px'),
  css.lineHeight(1),
  css.height('9px'),
  css.color('rgba(255, 255, 255, 0.9)'),
  css.screenA.marginTop('-17px'),
  css.screenA.fontSize('16px'),
  css.screenA.fontWeight('bold'),
  css.screenA.lineHeight('30px'),
  css.screenA.height('30px'),
  css.screenA.color('rgba(255, 255, 255, 0.75'),
  css.screenA.textShadow('0 0 4px rgba(255, 255, 255, 0.5)'),
  css.screenB.fontSize('20px'),
  css.screenC.fontSize('24px'),
  css.screenD.fontSize('30px')
))


const ElementDetails = styled.div(css => css.compose(
  css.position('absolute'),
  css.fontSize('4px'),
  css.color('rgba(255, 255, 255, 0.5)'),
  css.opacity(0),
  css.bottom('4px'),
  css.left(0),
  css.right(0),
  css.screenA.fontSize('4px'),
  css.screenA.opacity(1),
  css.screenC.fontSize('5px'),
  css.screenD.fontSize('6px')
))


const PeriodicTable = styled.div(css => css.compose(
  css.position('relative'),
  css.height('200px'),
  css.marginRight('-1px'),
  css.textShadow('none'),
  css.screenA.height('460px'),
  css.screenA.marginRight('-2px'),
  css.screenB.height('540px'),
  css.screenC.height('680px'),
  css.screenD.height('800px')
))


const PeriodicRow = styled.div(css => css.compose(
  css.clear('both'),
  css.height('10%')
))

const Element = props => (
  <Cell>
    {props.name && (
      <ElementWrapper color={props.color} className="element">
        <ElementNumber>{props.number}</ElementNumber>
        <ElementSymbol>{props.symbol}</ElementSymbol>
        <ElementDetails>
          {props.name}
          <br />
          {props.weight}
        </ElementDetails>
      </ElementWrapper>
    )}
  </Cell>
);

export const App = () => (
    <PeriodicTable>
      <PeriodicRow>
        <Element number={1} symbol="H" name="hydrogen" weight="1.008" color="c3" />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element number={2} symbol="He" name="helium" weight="4.0026" color="c4" />
      </PeriodicRow>
      <PeriodicRow>
        <Element number={3} symbol="Li" name="lithium" weight="6.94" color="c3" />
        <Element number={4} symbol="Be" name="beryllium" weight="9.0122" color="c2" />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element number={5} symbol="B" name="boron" weight="10.81" color="c2" />
        <Element number={6} symbol="C" name="carbon" weight="12.011" color="c3" />
        <Element number={7} symbol="N" name="nidivogen" weight="14.007" color="c3" />
        <Element number={8} symbol="O" name="oxygen" weight="15.999" color="c3" />
        <Element number={9} symbol="F" name="fluorine" weight="18.998" color="c3" />
        <Element number={10} symbol="Ne" name="neon" weight="20.180" color="c4" />
      </PeriodicRow>
      <PeriodicRow>
        <Element number={11} symbol="Na" name="sodium" weight="22.990" color="c3" />
        <Element number={12} symbol="Mg" name="magnesium" weight="24.305" color="c2" />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element />
        <Element number={13} symbol="Al" name="aluminum" weight="26.982" color="c2" />
        <Element number={14} symbol="Si" name="silicon" weight="28.085" color="c2" />
        <Element number={15} symbol="P" name="phosphorus" weight="30.974" color="c3" />
        <Element number={16} symbol="S" name="sulfur" weight="32.06" color="c3" />
        <Element number={17} symbol="Cl" name="chlorine" weight="35.45" color="c3" />
        <Element number={18} symbol="Ar" name="argon" weight="39.948" color="c4" />
      </PeriodicRow>
      <PeriodicRow>
        <Element number={19} symbol="K" name="potassium" weight="39.098" color="c3" />
        <Element number={20} symbol="Ca" name="calcium" weight="40.078" color="c2" />
        <Element number={21} symbol="Sc" name="scandium" weight="44.956" />
        <Element number={22} symbol="Ti" name="titanium" weight="47.867" />
        <Element number={23} symbol="V" name="vanadium" weight="50.942" />
        <Element number={24} symbol="Cr" name="chromium" weight="51.996" />
        <Element number={25} symbol="Mn" name="manganese" weight="54.938" />
        <Element number={26} symbol="Fe" name="iron" weight="55.845" />
        <Element number={27} symbol="Co" name="cobalt" weight="58.933" />
        <Element number={28} symbol="Ni" name="nickel" weight="58.693" />
        <Element number={29} symbol="Cu" name="copper" weight="63.546" />
        <Element number={30} symbol="Zn" name="zinc" weight="65.38" />
        <Element number={31} symbol="Ga" name="gallium" weight="69.723" color="c2" />
        <Element number={32} symbol="Ge" name="germanium" weight="72.63" color="c2" />
        <Element number={33} symbol="As" name="arsenic" weight="74.922" color="c2" />
        <Element number={34} symbol="Se" name="selenium" weight="78.96" color="c3" />
        <Element number={35} symbol="Br" name="bromine" weight="79.904" color="c3" />
        <Element number={36} symbol="Kr" name="krypton" weight="83.798" color="c4" />
      </PeriodicRow>
      <PeriodicRow>
        <Element number={37} symbol="Rb" name="rubidium" weight="85.468" color="c3" />
        <Element number={38} symbol="Sr" name="sdivontium" weight="87.62" color="c2" />
        <Element number={39} symbol="Y" name="ytdivium" weight="88.906" />
        <Element number={40} symbol="Zr" name="zirconium" weight="91.224" />
        <Element number={41} symbol="Nb" name="niobium" weight="92.906" />
        <Element number={42} symbol="Mo" name="molybdenum" weight="95.96" />
        <Element number={43} symbol="Tc" name="technetium" weight="97.91" />
        <Element number={44} symbol="Ru" name="ruthenium" weight="101.07" />
        <Element number={45} symbol="Rh" name="rhodium" weight="102.91" />
        <Element number={46} symbol="Pd" name="palladium" weight="106.42" />
        <Element number={47} symbol="Ag" name="silver" weight="107.87" />
        <Element number={48} symbol="Cd" name="cadmium" weight="112.41" />
        <Element number={49} symbol="In" name="indium" weight="114.82" color="c2" />
        <Element number={50} symbol="Sn" name="tin" weight="118.71" color="c2" />
        <Element number={51} symbol="Sb" name="antimony" weight="121.76" color="c2" />
        <Element number={52} symbol="Te" name="tellurium" weight="127.60" color="c2" />
        <Element number={53} symbol="I" name="iodine" weight="126.90" color="c3" />
        <Element number={54} symbol="Xe" name="xenon" weight="131.29" color="c4" />
      </PeriodicRow>
      <PeriodicRow>
        <Element number={55} symbol="Cs" name="cesium" weight="132.91" color="c3" />
        <Element number={56} symbol="Ba" name="barium" weight="137.33" color="c2" />
        <Element />
        <Element number={72} symbol="Hf" name="hafnium" weight="178.49" />
        <Element number={73} symbol="Ta" name="tantalum" weight="180.95" />
        <Element number={74} symbol="W" name="tungsten" weight="183.84" />
        <Element number={75} symbol="Re" name="rhenium" weight="186.21" />
        <Element number={76} symbol="Os" name="osmium" weight="190.23" />
        <Element number={77} symbol="Ir" name="iridium" weight="192.22" />
        <Element number={78} symbol="Pt" name="platinum" weight="195.08" />
        <Element number={79} symbol="Au" name="gold" weight="196.97" />
        <Element number={80} symbol="Hg" name="mercury" weight="200.59" />
        <Element number={81} symbol="Tl" name="thallium" weight="204.38" color="c2" />
        <Element number={82} symbol="Pb" name="lead" weight="207.2" color="c2" />
        <Element number={83} symbol="Bi" name="bismuth" weight="208.98"  color="c2"/>
        <Element number={84} symbol="Po" name="polonium" weight="208.98" color="c2" />
        <Element number={85} symbol="At" name="astatine" weight="209.99" color="c2" />
        <Element number={86} symbol="Rn" name="radon" weight="222.02" color="c4" />
      </PeriodicRow>
      <PeriodicRow>
        <Element number={87} symbol="Fr" name="francium" weight="223.02" color="c3" />
        <Element number={88} symbol="Ra" name="radium" weight="226.03" color="c2" />
        <Element />
        <Element
          number={104}
          symbol="Rf"
          name="rutherfordium"
          weight="265.12"
        />
        <Element number={105} symbol="Db" name="dubnium" weight="268.13" />
        <Element number={106} symbol="Sg" name="seaborgium" weight="271.13" />
        <Element number={107} symbol="Bh" name="bohrium" weight="270" />
        <Element number={108} symbol="Hs" name="hassium" weight="277.15" />
        <Element number={109} symbol="Mt" name="meitnerium" weight="276.15" />
        <Element number={110} symbol="Ds" name="darmstadtium" weight="281.16" />
        <Element number={111} symbol="Rg" name="roentgenium" weight="280.16" />
        <Element number={112} symbol="Cn" name="copernicium" weight="285.17" />
        <Element number={113} symbol="Uut" name="unundivium" weight="284.18" color="c2" />
        <Element number={114} symbol="Fl" name="flerovium" weight="289.19" color="c2" />
        <Element number={115} symbol="Uup" name="ununpentium" weight="288.19" color="c2" />
        <Element number={116} symbol="Lv" name="livermorium" weight="293" color="c2" />
        <Element number={117} symbol="Uus" name="ununseptium" weight="294" color="c2" />
        <Element number={118} symbol="Uuo" name="ununoctium" weight="294" color="c2" />
      </PeriodicRow>
      <PeriodicRow />
      <PeriodicRow>
        <Element />
        <Element />
        <Element />
        <Element number={57} symbol="La" name="lanthanum" weight="138.91" color="c5" />
        <Element number={58} symbol="Ce" name="cerium" weight="140.12" color="c5" />
        <Element number={59} symbol="Pr" name="praseodymium" weight="140.91" color="c5" />
        <Element number={60} symbol="Nd" name="neodymium" weight="144.24" color="c5" />
        <Element number={61} symbol="Pm" name="promethium" weight="144.91" color="c5" />
        <Element number={62} symbol="Sm" name="samarium" weight="150.36" color="c5" />
        <Element number={63} symbol="Eu" name="europium" weight="151.96" color="c5" />
        <Element number={64} symbol="Gd" name="gadolinium" weight="157.25" color="c5" />
        <Element number={65} symbol="Tb" name="terbium" weight="158.93" color="c5" />
        <Element number={66} symbol="Dy" name="dysprosium" weight="162.50" color="c5" />
        <Element number={67} symbol="Ho" name="holmium" weight="164.93" color="c5" />
        <Element number={68} symbol="Er" name="erbium" weight="167.26" color="c5" />
        <Element number={69} symbol="Tm" name="thulium" weight="168.93" color="c5" />
        <Element number={70} symbol="Yb" name="ytterbium" weight="173.05" color="c5" />
        <Element number={71} symbol="Lu" name="lutetium" weight="174.97" color="c5" />
      </PeriodicRow>
      <PeriodicRow>
        <Element />
        <Element />
        <Element />
        <Element number={89} symbol="Ac" name="actinium" weight="227.03" color="c5" />
        <Element number={90} symbol="Th" name="thorium" weight="232.04" color="c5" />
        <Element number={91} symbol="Pa" name="protactinium" weight="231.04" color="c5" />
        <Element number={92} symbol="U" name="uranium" weight="238.03" color="c5" />
        <Element number={93} symbol="Np" name="neptunium" weight="237.05" color="c5" />
        <Element number={94} symbol="Pu" name="plutonium" weight="244.06" color="c5" />
        <Element number={95} symbol="Am" name="americium" weight="243.06" color="c5" />
        <Element number={96} symbol="Cm" name="curium" weight="247.07" color="c5" />
        <Element number={97} symbol="Bk" name="berkelium" weight="247.07" color="c5" />
        <Element number={98} symbol="Cf" name="californium" weight="251.08" color="c5" />
        <Element number={99} symbol="Es" name="einsteinium" weight="252.08" color="c5" />
        <Element number={100} symbol="Fm" name="fermium" weight="257.10" color="c5" />
        <Element number={101} symbol="Md" name="mendelevium" weight="258.10" color="c5" />
        <Element number={102} symbol="No" name="nobelium" weight="259.10" color="c5" />
        <Element number={103} symbol="Lr" name="lawrencium" weight="262.11" color="c5" />
      </PeriodicRow>
    </PeriodicTable>
);
