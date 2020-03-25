import Vue from "vue";

Vue.component("app-element", {
  props: {
    name: String,
    number: Number,
    symbol: String,
    weight: String
  },
  template: `
      <div class="cell">
        <div class="element" v-if="name">
          <div class="at_num">{{ number }}</div>
          <div class="symbol">{{ symbol }}</div>
          <div class="at_details">
            {{ name }}
            <br />
            {{ name }}
          </div>
        </div>
      </div>
    `
});

Vue.component("periodic-table", {
  template: `
      <div class="periodic">
        <slot></slot>
      </div>
    `
});

Vue.component("periodic-row", {
  template: `
      <div class="periodic-row">
        <slot></slot>
      </div>
    `
});

export const app = new Vue({
  template: `
      <periodic-table>
        <periodic-row>
          <app-element :number="1" symbol="H" name="hydrogen" weight="1.008" />
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element :number="2" symbol="He" name="helium" weight="4.0026" />
        </periodic-row>
        <periodic-row>
          <app-element :number="3" symbol="Li" name="lithium" weight="6.94" />
          <app-element :number="4" symbol="Be" name="beryllium" weight="9.0122" />
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element :number="5" symbol="B" name="boron" weight="10.81" />
          <app-element :number="6" symbol="C" name="carbon" weight="12.011" />
          <app-element :number="7" symbol="N" name="nidivogen" weight="14.007" />
          <app-element :number="8" symbol="O" name="oxygen" weight="15.999" />
          <app-element :number="9" symbol="F" name="fluorine" weight="18.998" />
          <app-element :number="10" symbol="Ne" name="neon" weight="20.180" />
        </periodic-row>
        <periodic-row>
          <app-element :number="11" symbol="Na" name="sodium" weight="22.990" />
          <app-element :number="12" symbol="Mg" name="magnesium" weight="24.305" />
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element :number="13" symbol="Al" name="aluminum" weight="26.982" />
          <app-element :number="14" symbol="Si" name="silicon" weight="28.085" />
          <app-element :number="15" symbol="P" name="phosphorus" weight="30.974" />
          <app-element :number="16" symbol="S" name="sulfur" weight="32.06" />
          <app-element :number="17" symbol="Cl" name="chlorine" weight="35.45" />
          <app-element :number="18" symbol="Ar" name="argon" weight="39.948" />
        </periodic-row>
        <periodic-row>
          <app-element :number="19" symbol="K" name="potassium" weight="39.098" />
          <app-element :number="20" symbol="Ca" name="calcium" weight="40.078" />
          <app-element :number="21" symbol="Sc" name="scandium" weight="44.956" />
          <app-element :number="22" symbol="Ti" name="titanium" weight="47.867" />
          <app-element :number="23" symbol="V" name="vanadium" weight="50.942" />
          <app-element :number="24" symbol="Cr" name="chromium" weight="51.996" />
          <app-element :number="25" symbol="Mn" name="manganese" weight="54.938" />
          <app-element :number="26" symbol="Fe" name="iron" weight="55.845" />
          <app-element :number="27" symbol="Co" name="cobalt" weight="58.933" />
          <app-element :number="28" symbol="Ni" name="nickel" weight="58.693" />
          <app-element :number="29" symbol="Cu" name="copper" weight="63.546" />
          <app-element :number="30" symbol="Zn" name="zinc" weight="65.38" />
          <app-element :number="31" symbol="Ga" name="gallium" weight="69.723" />
          <app-element :number="32" symbol="Ge" name="germanium" weight="72.63" />
          <app-element :number="33" symbol="As" name="arsenic" weight="74.922" />
          <app-element :number="34" symbol="Se" name="selenium" weight="78.96" />
          <app-element :number="35" symbol="Br" name="bromine" weight="79.904" />
          <app-element :number="36" symbol="Kr" name="krypton" weight="83.798" />
        </periodic-row>
        <periodic-row>
          <app-element :number="37" symbol="Rb" name="rubidium" weight="85.468" />
          <app-element :number="38" symbol="Sr" name="sdivontium" weight="87.62" />
          <app-element :number="39" symbol="Y" name="ytdivium" weight="88.906" />
          <app-element :number="40" symbol="Zr" name="zirconium" weight="91.224" />
          <app-element :number="41" symbol="Nb" name="niobium" weight="92.906" />
          <app-element :number="42" symbol="Mo" name="molybdenum" weight="95.96" />
          <app-element :number="43" symbol="Tc" name="technetium" weight="97.91" />
          <app-element :number="44" symbol="Ru" name="ruthenium" weight="101.07" />
          <app-element :number="45" symbol="Rh" name="rhodium" weight="102.91" />
          <app-element :number="46" symbol="Pd" name="palladium" weight="106.42" />
          <app-element :number="47" symbol="Ag" name="silver" weight="107.87" />
          <app-element :number="48" symbol="Cd" name="cadmium" weight="112.41" />
          <app-element :number="49" symbol="In" name="indium" weight="114.82" />
          <app-element :number="50" symbol="Sn" name="tin" weight="118.71" />
          <app-element :number="51" symbol="Sb" name="antimony" weight="121.76" />
          <app-element :number="52" symbol="Te" name="tellurium" weight="127.60" />
          <app-element :number="53" symbol="I" name="iodine" weight="126.90" />
          <app-element :number="54" symbol="Xe" name="xenon" weight="131.29" />
        </periodic-row>
        <periodic-row>
          <app-element :number="55" symbol="Cs" name="cesium" weight="132.91" />
          <app-element :number="56" symbol="Ba" name="barium" weight="137.33" />
          <app-element></app-element>
          <app-element :number="72" symbol="Hf" name="hafnium" weight="178.49" />
          <app-element :number="73" symbol="Ta" name="tantalum" weight="180.95" />
          <app-element :number="74" symbol="W" name="tungsten" weight="183.84" />
          <app-element :number="75" symbol="Re" name="rhenium" weight="186.21" />
          <app-element :number="76" symbol="Os" name="osmium" weight="190.23" />
          <app-element :number="77" symbol="Ir" name="iridium" weight="192.22" />
          <app-element :number="78" symbol="Pt" name="platinum" weight="195.08" />
          <app-element :number="79" symbol="Au" name="gold" weight="196.97" />
          <app-element :number="80" symbol="Hg" name="mercury" weight="200.59" />
          <app-element :number="81" symbol="Tl" name="thallium" weight="204.38" />
          <app-element :number="82" symbol="Pb" name="lead" weight="207.2" />
          <app-element :number="83" symbol="Bi" name="bismuth" weight="208.98" />
          <app-element :number="84" symbol="Po" name="polonium" weight="208.98" />
          <app-element :number="85" symbol="At" name="astatine" weight="209.99" />
          <app-element :number="86" symbol="Rn" name="radon" weight="222.02" />
        </periodic-row>
        <periodic-row>
          <app-element :number="87" symbol="Fr" name="francium" weight="223.02" />
          <app-element :number="88" symbol="Ra" name="radium" weight="226.03" />
          <app-element></app-element>
          <app-element :number="104" symbol="Rf" name="rutherfordium" weight="265.12" />
          <app-element :number="105" symbol="Db" name="dubnium" weight="268.13" />
          <app-element :number="106" symbol="Sg" name="seaborgium" weight="271.13" />
          <app-element :number="107" symbol="Bh" name="bohrium" weight="270" />
          <app-element :number="108" symbol="Hs" name="hassium" weight="277.15" />
          <app-element :number="109" symbol="Mt" name="meitnerium" weight="276.15" />
          <app-element :number="110" symbol="Ds" name="darmstadtium" weight="281.16" />
          <app-element :number="111" symbol="Rg" name="roentgenium" weight="280.16" />
          <app-element :number="112" symbol="Cn" name="copernicium" weight="285.17" />
          <app-element :number="113" symbol="Uut" name="unundivium" weight="284.18" />
          <app-element :number="114" symbol="Fl" name="flerovium" weight="289.19" />
          <app-element :number="115" symbol="Uup" name="ununpentium" weight="288.19" />
          <app-element :number="116" symbol="Lv" name="livermorium" weight="293" />
          <app-element :number="117" symbol="Uus" name="ununseptium" weight="294" />
          <app-element :number="118" symbol="Uuo" name="ununoctium" weight="294" />
        </periodic-row>
        <periodic-row />
        <periodic-row>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element :number="57" symbol="La" name="lanthanum" weight="138.91" />
          <app-element :number="58" symbol="Ce" name="cerium" weight="140.12" />
          <app-element :number="59" symbol="Pr" name="praseodymium" weight="140.91" />
          <app-element :number="60" symbol="Nd" name="neodymium" weight="144.24" />
          <app-element :number="61" symbol="Pm" name="promethium" weight="144.91" />
          <app-element :number="62" symbol="Sm" name="samarium" weight="150.36" />
          <app-element :number="63" symbol="Eu" name="europium" weight="151.96" />
          <app-element :number="64" symbol="Gd" name="gadolinium" weight="157.25" />
          <app-element :number="65" symbol="Tb" name="terbium" weight="158.93" />
          <app-element :number="66" symbol="Dy" name="dysprosium" weight="162.50" />
          <app-element :number="67" symbol="Ho" name="holmium" weight="164.93" />
          <app-element :number="68" symbol="Er" name="erbium" weight="167.26" />
          <app-element :number="69" symbol="Tm" name="thulium" weight="168.93" />
          <app-element :number="70" symbol="Yb" name="ytterbium" weight="173.05" />
          <app-element :number="71" symbol="Lu" name="lutetium" weight="174.97" />
        </periodic-row>
        <periodic-row>
          <app-element></app-element>
          <app-element></app-element>
          <app-element></app-element>
          <app-element :number="89" symbol="Ac" name="actinium" weight="227.03" />
          <app-element :number="90" symbol="Th" name="thorium" weight="232.04" />
          <app-element :number="91" symbol="Pa" name="protactinium" weight="231.04" />
          <app-element :number="92" symbol="U" name="uranium" weight="238.03" />
          <app-element :number="93" symbol="Np" name="neptunium" weight="237.05" />
          <app-element :number="94" symbol="Pu" name="plutonium" weight="244.06" />
          <app-element :number="95" symbol="Am" name="americium" weight="243.06" />
          <app-element :number="96" symbol="Cm" name="curium" weight="247.07" />
          <app-element :number="97" symbol="Bk" name="berkelium" weight="247.07" />
          <app-element :number="98" symbol="Cf" name="californium" weight="251.08" />
          <app-element :number="99" symbol="Es" name="einsteinium" weight="252.08" />
          <app-element :number="100" symbol="Fm" name="fermium" weight="257.10" />
          <app-element :number="101" symbol="Md" name="mendelevium" weight="258.10" />
          <app-element :number="102" symbol="No" name="nobelium" weight="259.10" />
          <app-element :number="103" symbol="Lr" name="lawrencium" weight="262.11" />
        </periodic-row>
      </periodic-table>
    `
});
