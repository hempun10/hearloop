import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="ad666a5a-3d3a-484e-95ac-5b6c7739f729",
    name="Update Tagline and Verify Public Board Display",
    tc_id="TC-27",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"tagline": "Built with Kane ", "saved_appears": "true", "board_header_acme_check": "Acme", "hearloop_brand_next_to_logo": "false", "stored_tagline_under_board_name": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/acme/dashboard/settings', instruction_id='88ce4031-da5c-487d-b708-41477a0891a0'):
        variable_value_0 = var('{{global.base_url}}/login?next=/acme/dashboard/settings')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for the next step in your queued plan', instruction_id='0b9d557e-38b8-4ce4-90c1-50fa25b31345'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='7d0ad16a-5661-411e-ac9e-e7fd7b0fb268'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='8c4f79e5-4546-4e7a-b303-c28b5b427784'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in button', instruction_id='19c1eb81-0e21-4d59-81b7-66551698ebc9'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Waiting for the plan actions to complete', instruction_id='2a80f1eb-80f9-4395-9360-218f9c8fb9ea'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "Built with Kane {{smart.random_string_4}}" into "Tagline Shown under the name on your public board."', instruction_id='2e3cf2a5-9b23-4182-8f7a-f5903b42724e'):
        element_5 = page.locator("internal:role=textbox[name=\"Tagline Shown under the name\"i]")
        variable_value_6 = var('Built with Kane {{smart.random_string_4}}')
        
        await testmu.fill(element_5, variable_value_6)
    
    async with testmu.step('Scroll into view: PRIMARY: click the green accent swatch; role=button; text="Accent #7fb894" | HINTS: container=Branding; color=green', instruction_id='a74251f6-1e68-4dfa-9e85-768539b15d24'):
        element_7 = page.locator("internal:role=button[name=\"Accent #7fb894\"i]")
        await element_7.evaluate("el => el.scrollIntoView({block: 'center'})")
    
    async with testmu.step('Click "Accent #7fb894"', instruction_id='beffd71b-befe-4c96-bcc0-6fa46850d64e'):
        _loc_2 = page.locator("internal:role=button[name=\"Accent #7fb894\"i]")
        
        await _loc_2.click()
    
    async with testmu.step('Click "Save changes"', instruction_id='0518e0ec-f4ec-4149-90e6-3783c32b4be7'):
        _loc_3 = page.locator("internal:role=button[name=\"Save changes\"i]")
        
        await _loc_3.click()
    
    async with testmu.step('Reading the tagline from Board settings'):
        set_var('tagline', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {19: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(19).value);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=textbox[name="Tagline Shown under the name"i]'], query='the value in the Tagline textbox in the Board settings form', expected_value='', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition='the tagline you typed is stored as {{tagline}}'))
    
    async with testmu.step('Checking whether the Saved status is present'):
        set_var('saved_appears', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {54: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (Array.from(el(54).querySelectorAll('*')).some(e => e.textContent.trim() === 'Saved' && (e.offsetWidth || e.offsetHeight || e.getClientRects().length)));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="SavedSave changes"i'], query="whether the 'Saved' status text is present in the Board settings form", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="'Saved' appears."))
    
    async with testmu.step('Assertion check', instruction_id='d6ac1fde-8c14-43be-ba3e-3c7f5a0b4df7'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "'Saved' appears.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{saved_appears}}', 'store_key': 'saved_appears', 'variable_refs': {'{{saved_appears}}': 'true'}}], 'sub_checks': [{'description': "'Saved' appears.", 'store_key': 'saved_appears', 'expected_value': 'true', 'extracted_value': '{{saved_appears}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "'Saved' appears."})
    
    async with testmu.step('Clicking View public board in the sidebar navigation', instruction_id='9e341a7b-438a-4b93-9141-65f2be0318cf'):
        _loc_4 = page.locator("internal:role=link[name=\"View public board\"i]")
        
        await _loc_4.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the public board heading Acme to be visible', instruction_id='bd423d15-69e3-433d-a6ce-d5832d7f5ef6'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Acme' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Reading the board header name'):
        set_var('board_header_acme_check', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {10: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(10).textContent);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Acme"i]'], query='the board name in the main board header', expected_value='Acme', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="the board header shows 'Acme'"))
    
    async with testmu.step('whether the hearloop brand appears next to the logo in the top-left header', instruction_id='26fe865e-507c-4c4a-a82f-60c2fd5e189f'):
        set_var('hearloop_brand_next_to_logo', await testmu.vision_query(page, "whether the hearloop brand appears next to the logo in the top-left header", ""))
    
    async with testmu.step('Checking whether the stored tagline appears under the board name'):
        set_var('stored_tagline_under_board_name', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {11: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(11).textContent.trim().length > 0);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Built with Kane"i'], query='whether the stored tagline value is present in the paragraph under the board name', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the stored tagline value appears under the board name'))
    
    async with testmu.step('Assertion check', instruction_id='b6360985-ee2c-4f60-b999-0e8ac3481134'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the board header shows 'Acme'", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Acme', 'extracted_value': '{{board_header_acme_check}}', 'store_key': 'board_header_acme_check', 'variable_refs': {'{{board_header_acme_check}}': 'Acme'}}, {'description': "no 'hearloop' brand appears next to the logo", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'false', 'extracted_value': '{{hearloop_brand_next_to_logo}}', 'store_key': 'hearloop_brand_next_to_logo', 'variable_refs': {'{{hearloop_brand_next_to_logo}}': 'false'}}, {'description': 'the stored tagline value appears under the board name', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{stored_tagline_under_board_name}}', 'store_key': 'stored_tagline_under_board_name', 'variable_refs': {'{{stored_tagline_under_board_name}}': 'true'}}], 'sub_checks': [{'description': "the board header shows 'Acme'", 'store_key': 'board_header_acme_check', 'expected_value': 'Acme', 'extracted_value': '{{board_header_acme_check}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': "no 'hearloop' brand appears next to the logo", 'store_key': 'hearloop_brand_next_to_logo', 'expected_value': 'false', 'extracted_value': '{{hearloop_brand_next_to_logo}}', 'operator': 'equals', 'transforms': []}, {'description': 'the stored tagline value appears under the board name', 'store_key': 'stored_tagline_under_board_name', 'expected_value': 'true', 'extracted_value': '{{stored_tagline_under_board_name}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the board header shows 'Acme' with no 'hearloop' brand next to the logo, and the stored tagline value appears under the board name"})


if __name__ == "__main__":
    testmu.run(test)