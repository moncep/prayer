import json
import re

def build_rosary_html():
    from rosary_data_source import MYSTERIES_DATA, CLOSING_DATA
    
    html = []
    html.append('<div class="rosary-full-guide font-malayalam space-y-6">')
    
    # Header
    html.append('''
  <div style="text-align: center; border-bottom: 1px solid rgba(180, 83, 9, 0.2); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
    <h2 style="font-size: 1.6rem; font-weight: 800; color: #78350f; margin-bottom: 0.4rem;">വിശുദ്ധ ജപമാല (അമ്പത്തിമൂന്നുമണി ജപം)</h2>
    <p style="font-size: 0.95rem; color: #57534e; font-style: italic;">പരമ്പരാഗത കുടുംബ പ്രാർത്ഥനാ ക്രമം</p>
  </div>
''')

    # Opening Offering
    html.append('''
  <div class="prayer-card" style="background: rgba(254, 243, 199, 0.35); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 1rem; padding: 1.25rem; margin-bottom: 1.5rem;">
    <h3 style="font-size: 1.15rem; font-weight: 700; color: #92400e; margin-bottom: 0.6rem;">ആരംഭ സമർപ്പണ പ്രാർത്ഥന</h3>
    <p style="font-weight: 600; margin-bottom: 0.6rem; color: #44403c;">പിതാവിന്റെയും പുത്രന്റെയും പരിശുദ്ധാത്മാവിന്റെയും നാമത്തിൽ. ആമേൻ.</p>
    <p style="line-height: 1.85; margin-bottom: 0.75rem; color: #292524;">
      അളവില്ലാത്ത സകല നന്മ സ്വരൂപിയായിരിക്കുന്ന സർവ്വേശ്വര, കർത്താവേ, നീചരും നന്ദിയില്ലാത്ത പാപികളുമായിരിക്കുന്ന ഞങ്ങൾ അതിരില്ലാത്ത മഹിമ പ്രതാപത്തോടുകൂടിയിരിക്കുന്ന അങ്ങേ സന്നിധിയിൽ ജപം ചെയ്യുവാൻ യോഗ്യതയില്ലാത്തവരായിരിക്കുന്നുവെങ്കിലും നിന്റെ അതിരില്ലാത്ത ദയയിൽ ശരണപ്പെട്ടു കൊണ്ട് പരിശുദ്ധ ദൈവമാതാവിന് സ്തുതിയായിട്ട് അമ്പത്തിമൂന്നുമണി ജപം ചെയ്യുവാൻ ആഗ്രഹിക്കുന്നു.
    </p>
    <p style="line-height: 1.85; color: #292524;">
      ഈ ജപം ഭക്തിയോടെ ചെയ്ത് പലവിചാരം കൂടാതെ തികപ്പാൻ കർത്താവേ നീ സഹായിക്കണമേ.
    </p>
  </div>
''')

    # Apostles Creed
    html.append('''
  <div class="prayer-card" style="background: rgba(254, 243, 199, 0.35); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 1rem; padding: 1.25rem; margin-bottom: 1.5rem;">
    <h3 style="font-size: 1.15rem; font-weight: 700; color: #92400e; margin-bottom: 0.6rem;">വിശ്വാസപ്രമാണം</h3>
    <p style="line-height: 1.85; color: #292524;">
      സർവ്വശക്തനായ പിതാവും ആകാശത്തിന്റെയും ഭൂമിയുടെയും സ്രഷ്ടാവുമായ ദൈവത്തിൽ ഞാൻ വിശ്വസിക്കുന്നു. അവിടുത്തെ ഏകപുത്രനും ഞങ്ങളുടെ കർത്താവുമായ ഈശോമിശിഹായിലും ഞാൻ വിശ്വസിക്കുന്നു. ഈ പുത്രൻ പരിശുദ്ധാത്മാവാൽ ഗർഭസ്ഥനായി കന്യാമറിയത്തിൽ നിന്നു പിറന്നു. പന്തിയോസ് പീലാത്തോസിന്റെ കാലത്ത് പീഡകൾ സഹിച്ച്, കുരിശിൽ തറയ്ക്കപ്പെട്ട്, മരിച്ച് അടക്കപ്പെട്ടു; പാതാളത്തിൽ ഇറങ്ങി, മരിച്ചവരുടെ ഇടയിൽനിന്ന് മൂന്നാം നാൾ ഉയിർത്തു; സ്വർഗ്ഗത്തിലെക്കെഴുന്നള്ളി, സർവ്വശക്തിയുള്ള പിതാവായ ദൈവത്തിന്റെ വലതു ഭാഗത്ത് ഇരിക്കുന്നു; അവിടെനിന്ന് ജീവിക്കുന്നവരെയും മരിച്ചവരെയും വിധിക്കാൻ വരുമെന്നും ഞാൻ വിശ്വസിക്കുന്നു. പരിശുദ്ധാത്മാവിലും ഞാൻ വിശ്വസിക്കുന്നു. വിശുദ്ധ കത്തോലിക്കാ സഭയിലും, പുണ്യവാന്മാരുടെ ഐക്യത്തിലും, പാപങ്ങളുടെ മോചനത്തിലും, ശരീരത്തിന്റെ ഉയിർപ്പിലും നിത്യമായ ജീവിതത്തിലും ഞാൻ വിശ്വസിക്കുന്നു. ആമ്മേൻ.
    </p>
  </div>
''')

    # Initial Beads (Our Father + 3 Virtues)
    html.append('''
  <div class="prayer-card" style="background: rgba(254, 243, 199, 0.35); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 1rem; padding: 1.25rem; margin-bottom: 1.5rem;">
    <h3 style="font-size: 1.15rem; font-weight: 700; color: #92400e; margin-bottom: 0.6rem;">പ്രാരംഭ മണികൾ</h3>
    <p style="font-weight: 600; color: #78350f; margin-bottom: 0.75rem;">1 സ്വർഗ്ഗസ്ഥനായ ഞങ്ങളുടെ പിതാവേ...</p>
    
    <div style="margin-bottom: 0.75rem; padding-left: 0.5rem; border-left: 3px solid #d97706;">
      <strong style="color: #92400e;">1. ദൈവവിശ്വാസം:</strong>
      <p style="line-height: 1.75; color: #292524; margin-top: 0.2rem;">
        പിതാവായ ദൈവത്തിന്റെ മകളായിരിക്കുന്ന പരിശുദ്ധ ദൈവമാതാവേ, ഞങ്ങളിൽ ദൈവവിശ്വാസമെന്ന പുണ്യം ഫലവത്തായിത്തീരുന്നതിന് അങ്ങേ തിരുക്കുമാരനോട് അപേക്ഷിക്കണമേ.
      </p>
      <span style="font-size: 0.88rem; font-weight: 600; color: #b45309;">(1 നന്മനിറഞ്ഞ മറിയമേ...)</span>
    </div>

    <div style="margin-bottom: 0.75rem; padding-left: 0.5rem; border-left: 3px solid #d97706;">
      <strong style="color: #92400e;">2. ദൈവശരണം:</strong>
      <p style="line-height: 1.75; color: #292524; margin-top: 0.2rem;">
        പുത്രനായ ദൈവത്തിന്റെ മാതാവായിരിക്കുന്ന പരിശുദ്ധ ദൈവമാതാവേ, ഞങ്ങൾ ദൈവശരണമെന്ന പുണ്യത്തിൽ വളരുവാനായി അങ്ങേ തിരുക്കുമാരനോട് അപേക്ഷിക്കണമേ.
      </p>
      <span style="font-size: 0.88rem; font-weight: 600; color: #b45309;">(1 നന്മനിറഞ്ഞ മറിയമേ...)</span>
    </div>

    <div style="padding-left: 0.5rem; border-left: 3px solid #d97706;">
      <strong style="color: #92400e;">3. ദൈവസ്നേഹം:</strong>
      <p style="line-height: 1.75; color: #292524; margin-top: 0.2rem;">
        പരിശുദ്ധാത്മാവായ ദൈവത്തിന്റെ എത്രയും പ്രിയമുള്ള മണവാട്ടിയായിരിക്കുന്ന പരിശുദ്ധ ദൈവമാതാവേ, ഞങ്ങളിൽ ദൈവസ്നേഹമെന്ന പുണ്യം വർദ്ധിക്കുവാനായിട്ട് അങ്ങേ തിരുക്കുമാരനോട് അപേക്ഷിക്കണമേ.
      </p>
      <span style="font-size: 0.88rem; font-weight: 600; color: #b45309;">(1 നന്മനിറഞ്ഞ മറിയമേ... 1 ത്രീത്വസ്തുതി...)</span>
    </div>
  </div>
''')

    # Mysteries
    for set_data in MYSTERIES_DATA:
        html.append(f'''
  <div class="mystery-set-block" style="margin-top: 2rem; margin-bottom: 2rem;">
    <div style="background: linear-gradient(135deg, #78350f, #451a03); color: #fef3c7; border-radius: 1rem; padding: 1rem 1.25rem; margin-bottom: 1.25rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <h3 style="font-size: 1.25rem; font-weight: 800; margin: 0;">{set_data['name']}</h3>
      <p style="font-size: 0.85rem; opacity: 0.85; margin: 0.2rem 0 0 0;">({set_data['days']})</p>
    </div>
''')
        for item in set_data['mysteries']:
            html.append(f'''
    <div class="decade-item" style="background: #ffffff; border: 1px solid #e7e5e4; border-radius: 1rem; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);">
      <div style="display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span style="background: #fef3c7; color: #92400e; font-weight: 800; font-size: 0.8rem; padding: 0.2rem 0.5rem; border-radius: 0.375rem; border: 1px solid #fde68a;">{item['number']}</span>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: #1c1917; margin: 0; line-height: 1.5;">{item['title']}</h4>
      </div>
      <p style="line-height: 1.8; color: #44403c; margin: 0.5rem 0;">{item['scripture']}</p>
      <div style="background: #fbfbfa; border-radius: 0.5rem; padding: 0.6rem 0.85rem; margin-top: 0.75rem; font-size: 0.88rem; color: #78350f; font-weight: 600; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem;">
        <span>1 സ്വർഗ്ഗസ്ഥനായ • 10 നന്മനിറഞ്ഞ • 1 ത്രീത്വസ്തുതി</span>
        <span style="color: #059669; font-weight: 700;">ഫലം: {item['fruit']}</span>
      </div>
      <p style="font-size: 0.85rem; color: #78716c; font-style: italic; margin-top: 0.5rem;">
        ഓ എന്റെ ഈശോയേ, ഞങ്ങളുടെ പാപങ്ങൾ പൊറുക്കണമേ, നരകാഗ്നിയിൽ നിന്നു ഞങ്ങളെ രക്ഷിക്കണമേ, എല്ലാ ആത്മാക്കളെയും വിശിഷ്യാ അങ്ങേ കരുണ കൂടുതൽ ആവശ്യമുള്ളവരെ സ്വർഗ്ഗത്തിലേക്ക് ആനയിക്കണമേ.
      </p>
    </div>
''')
        html.append('  </div>')

    # Concluding Prayers
    html.append('''
  <div class="closing-section" style="margin-top: 2.5rem; border-t: 2px solid #e7e5e4; padding-top: 1.5rem;">
    <h3 style="font-size: 1.35rem; font-weight: 800; color: #78350f; text-align: center; margin-bottom: 1.5rem;">സമാപന പ്രാർത്ഥനകൾ</h3>

    <!-- Salve Regina -->
    <div style="background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; padding: 1.25rem; margin-bottom: 1.25rem;">
      <h4 style="font-size: 1.15rem; font-weight: 700; color: #92400e; margin-bottom: 0.6rem;">പരിശുദ്ധ രാജ്ഞീ (Salve Regina)</h4>
      <p style="line-height: 1.85; color: #292524; margin-bottom: 0.75rem;">
        പരിശുദ്ധ രാജ്ഞീ, കരുണയുള്ള മാതാവേ! സ്വസ്തി! ഞങ്ങളുടെ ജീവനും മാധുര്യവും ശരണവുമേ സ്വസ്തി! ഹവ്വായുടെ പുറംതള്ളപ്പെട്ട മക്കളായ ഞങ്ങൾ അങ്ങേപ്പക്കൽ നിലവിളിക്കുന്നു. കണ്ണുനീരിന്റെ ഈ താഴ്‌വരയിൽ നിന്ന് വിങ്ങിക്കരഞ്ഞ് അങ്ങേപ്പക്കൽ ഞങ്ങൾ നെടുവീർപ്പെടുന്നു.
      </p>
      <p style="line-height: 1.85; color: #292524; margin-bottom: 0.75rem;">
        ആകയാൽ ഞങ്ങളുടെ മദ്ധ്യസ്ഥേ, അങ്ങയുടെ കരുണയുള്ള കണ്ണുകൾ ഞങ്ങളുടെ നേരെ തിരിക്കേണമേ. ഞങ്ങളുടെ ഈ പ്രവാസത്തിനു ശേഷം അങ്ങയുടെ ഉദരത്തിന്റെ അനുഗ്രഹീതഫലമായ ഈശോയെ ഞങ്ങൾക്ക് കാണിച്ചു തരേണമേ. ഏറ്റവും കരുണയും വാത്സല്യവും മാധുര്യവും നിറഞ്ഞ കന്യകാമറിയമേ! ആമ്മേൻ.
      </p>
      <div style="padding-left: 0.75rem; border-left: 3px solid #d97706; margin-bottom: 0.75rem;">
        <p style="font-weight: 600; color: #78350f; margin: 0.2rem 0;">ല: ഈശോമിശിഹായുടെ വാഗ്ദാനങ്ങൾക്ക് ഞങ്ങൾ യോഗ്യരാകുവാൻ,</p>
        <p style="font-weight: 600; color: #78350f; margin: 0.2rem 0;">ഉ: സർവ്വേശ്വരന്റെ പരിശുദ്ധ മാതാവേ, ഞങ്ങൾക്കുവേണ്ടി അപേക്ഷിക്കണമേ.</p>
      </div>
      <p style="font-weight: 700; color: #92400e; margin-bottom: 0.25rem;">പ്രാർത്ഥിക്കാം:</p>
      <p style="line-height: 1.85; color: #292524;">
        സർവ്വശക്തനും നിത്യനുമായ സർവ്വേശ്വരാ, ഭാഗ്യവതിയായ മറിയത്തിന്റെ ആത്മാവും ശരീരവും പരിശുദ്ധാത്മാവിന്റെ അനുഗ്രഹത്താൽ അങ്ങേ ദിവ്യപുത്രനു യോഗ്യമായ പീഠമായിരിപ്പാൻ ആദിയിൽ അങ്ങ് നിശ്ചയിച്ചുവല്ലോ. ഈ ദിവ്യമാതാവിനെ നിനച്ചു സന്തോഷിക്കുന്ന ഞങ്ങൾ അവളുടെ ശക്തിയുള്ള അപേക്ഷകളാൽ ഈ ലോകത്തിലുള്ള സകല ആപത്തുകളിലും നിത്യമരണത്തിലും നിന്നു രക്ഷിക്കപ്പെടുവാൻ കൃപ ചെയ്യണമേ. ഈ അപേക്ഷകളൊക്കെയും ഞങ്ങളുടെ കർത്താവീശോ മിശിഹായുടെ യോഗ്യതകളെക്കുറിച്ചു ഞങ്ങൾക്ക് തരേണമേ. ആമ്മേൻ.
      </p>
    </div>

    <!-- Memorare -->
    <div style="background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; padding: 1.25rem; margin-bottom: 1.25rem;">
      <h4 style="font-size: 1.15rem; font-weight: 700; color: #92400e; margin-bottom: 0.6rem;">എത്രയും ദയയുള്ള മാതാവേ (Memorare)</h4>
      <p style="line-height: 1.85; color: #292524; margin-bottom: 0.75rem;">
        എത്രയും ദയയുള്ള മാതാവേ, അങ്ങേ സങ്കേതത്തിൽ ഓടിവന്ന്, അങ്ങേ സഹായം തേടി, അങ്ങേ മാദ്ധ്യസ്ഥം അപേക്ഷിച്ചവരിൽ ഒരുവനെയെങ്കിലും അങ്ങ് ഉപേക്ഷിച്ചതായി ലോകത്തിൽ കേട്ടിട്ടില്ല എന്ന് ഓർക്കണമേ.
      </p>
      <p style="line-height: 1.85; color: #292524; margin-bottom: 0.75rem;">
        കന്യാവ്രതക്കാരുടെ രാജ്ഞീ, ദയയുള്ള മാതാവേ, ഈ വിശ്വാസത്തിൽ ശരണപ്പെട്ട്, അങ്ങേ തൃപ്പാദത്തിങ്കൽ ഞാൻ അണയുന്നു. നെടുവീർപ്പോടും കണ്ണുനീരോടും കൂടെ പാപിയായ ഞാൻ അങ്ങേ ദയാധിക്യത്തെ പ്രതീക്ഷിച്ചുകൊണ്ട് അങ്ങേ സന്നിധിയിൽ നിൽക്കുന്നു.
      </p>
      <p style="line-height: 1.85; color: #292524;">
        അവതരിച്ച വചനത്തിൻ മാതാവേ, എന്റെ അപേക്ഷ ഉപേക്ഷിക്കാതെ ദയാപൂർവ്വം കേട്ടരുളേണമേ. ആമ്മേൻ.
      </p>
    </div>

    <!-- Litany of Loreto -->
    <div style="background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; padding: 1.25rem; margin-bottom: 1.25rem;">
      <h4 style="font-size: 1.15rem; font-weight: 700; color: #92400e; margin-bottom: 0.6rem;">മാതാവിന്റെ ലുത്തിനിയ</h4>
      <div style="line-height: 1.9; color: #292524; white-space: pre-line;">''' + CLOSING_DATA['litany'] + '''</div>
    </div>
  </div>
</div>
''')

    return "".join(html)

if __name__ == '__main__':
    print("Builder ready.")
