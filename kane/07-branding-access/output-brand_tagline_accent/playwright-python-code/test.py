import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="5717b36f-756f-48fb-9d31-4c11c4cd6381",
    name="Update Tagline and Verify Public Board Display",
    tc_id="TC-33",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"saved_appears": "true", "tagline": "Built with Kane fyBNyB4V", "board_header_acme": "Acme", "hearloop_brand_next_to_logo": "false", "stored_tagline_under_board_name": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/acme/dashboard/settings', instruction_id='b0da0bf7-e958-4ee2-a26d-27a48b9ef294'):
        variable_value_0 = var('{{global.base_url}}/login?next=/acme/dashboard/settings')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the Sign in form steps to finish', instruction_id='337d25fd-a8c3-42b4-8824-cd43faa00864'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='225ff338-71c3-4e2e-aadb-3f4fe3648029'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='a925705f-0e2d-49a7-b5de-4e438838cbf4'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in button', instruction_id='cc382cfc-d928-41eb-b2fd-1f3902111467'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Waiting for the queued steps to complete', instruction_id='a7f251f2-a9c8-44be-98fa-9d5f37cd01f0'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "Built with Kane {{smart.random_string_8}}" into "Tagline"', instruction_id='1a4e07ea-2e6a-4d1e-a833-8a0a56b17847'):
        element_5 = page.locator("internal:role=textbox[name=\"Tagline\"i]")
        variable_value_6 = var('Built with Kane {{smart.random_string_8}}')
        
        await testmu.fill(element_5, variable_value_6)
    
    async with testmu.step('Scroll into view: PRIMARY: click the green accent swatch; role=radio; text="Green accent" | HINTS: container=Accent colour', instruction_id='0c75de17-820e-4b51-acfe-3701db6945c4'):
        element_7 = page.locator("internal:role=radio[name=\"Green accent\"i]")
        await element_7.evaluate("el => el.scrollIntoView({block: 'center'})")
    
    async with testmu.step('Click "Green accent"', instruction_id='f1dd455f-7be7-4b12-86a9-3c216684ba7c'):
        _loc_2 = page.locator("internal:role=radio[name=\"Green accent\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Click "Save changes"', instruction_id='4695e7b8-4ceb-4a77-83b5-b07b40be4777'):
        _loc_3 = page.locator("internal:role=button[name=\"Save changes\"i]")
        
        await _loc_3.click()
    
    async with testmu.step('Checking whether the Saved confirmation is present'):
        set_var('saved_appears', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {81: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(81).textContent.includes('Saved'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="SavedSave changes"i'], query="whether the 'Saved' text is present in the Board settings form", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="'Saved' appears"))
    
    async with testmu.step('Reading the tagline from General settings'):
        set_var('tagline', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {31: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(31).value);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Tagline"i]'], query='the value in the Tagline textbox in the General settings section', expected_value='', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition='the tagline you typed is stored as {{tagline}}'))
    
    async with testmu.step('Assertion check', instruction_id='e4503f79-233a-41c5-840f-de792f49fa79'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "'Saved' appears", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{saved_appears}}', 'store_key': 'saved_appears', 'variable_refs': {'{{saved_appears}}': 'true'}}], 'sub_checks': [{'description': "'Saved' appears", 'store_key': 'saved_appears', 'expected_value': 'true', 'extracted_value': '{{saved_appears}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "'Saved' appears"})
    
    async with testmu.step('Clicking View public board', instruction_id='5f5e3058-280b-45ba-a0cb-be02cd1e8c33'):
        _loc_4 = page.locator("internal:role=link[name=\"View public board\"i]")
        
        await _loc_4.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Acme public board heading to be visible', instruction_id='c5b7ddab-d944-49d4-80d5-8a79b709745c'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Acme' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Reading the board header'):
        set_var('board_header_acme', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {10: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(10).textContent.trim());\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Acme"i]'], query='the board name in the main page heading', expected_value='Acme', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the board header shows 'Acme'"))
    
    async with testmu.step('Checking whether the hearloop brand is present next to the logo'):
        set_var('hearloop_brand_next_to_logo', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {1: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (Array.from(el(1).querySelectorAll('a,span,p,div')).some(e => e.textContent.trim().toLowerCase() === 'hearloop' || e.textContent.trim().toLowerCase() === 'powered by hearloop'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="AAcmeBoardRoadmapChangelogDashboardEBoardRoadmapChangelog"i'], query='whether the hearloop brand appears next to the logo in the top banner', expected_value='false', needs_unit_conversion=False, operator='equals', transforms=[], condition="no 'hearloop' brand appears next to the logo"))
    
    async with testmu.step('Checking whether the stored tagline is present under the board name'):
        set_var('stored_tagline_under_board_name', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {11: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(11).textContent.trim() === 'Built with Kane fyBNyB4V');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Built with Kane fyBNyB4V"i'], query='whether the stored tagline value is present in the paragraph directly under the board name', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the stored tagline value appears under the board name'))
    
    async with testmu.step('Assertion check', instruction_id='a8e57698-7cfe-420f-9352-766a2f4d389a'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the board header shows 'Acme'", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Acme', 'extracted_value': '{{board_header_acme}}', 'store_key': 'board_header_acme', 'variable_refs': {'{{board_header_acme}}': 'Acme'}}, {'description': "no 'hearloop' brand appears next to the logo", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{hearloop_brand_next_to_logo}}', 'store_key': 'hearloop_brand_next_to_logo', 'variable_refs': {'{{hearloop_brand_next_to_logo}}': 'false'}}, {'description': 'the stored tagline value appears under the board name', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{stored_tagline_under_board_name}}', 'store_key': 'stored_tagline_under_board_name', 'variable_refs': {'{{stored_tagline_under_board_name}}': 'true'}}], 'sub_checks': [{'description': "the board header shows 'Acme'", 'store_key': 'board_header_acme', 'expected_value': 'Acme', 'extracted_value': '{{board_header_acme}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': "no 'hearloop' brand appears next to the logo", 'store_key': 'hearloop_brand_next_to_logo', 'expected_value': 'false', 'extracted_value': '{{hearloop_brand_next_to_logo}}', 'operator': 'equals', 'transforms': []}, {'description': 'the stored tagline value appears under the board name', 'store_key': 'stored_tagline_under_board_name', 'expected_value': 'true', 'extracted_value': '{{stored_tagline_under_board_name}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the board header shows 'Acme' with no 'hearloop' brand next to the logo, and the stored tagline value appears under the board name"})


if __name__ == "__main__":
    testmu.run(test)