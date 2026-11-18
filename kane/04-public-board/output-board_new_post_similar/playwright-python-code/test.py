import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="24929c6b-d860-4a6b-9a09-ecc56711b07e",
    name="Post and Verify New Idea",
    tc_id="TC-19",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"similar_requests_box_visible": "true", "similar_requests_dark_mode_toggle": "true", "post_page_title": "Kane check", "post_page_not_verified_yet": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme', instruction_id='deb33559-8f04-4cee-b304-896967bca0a1'):
        variable_value_0 = var('{{global.base_url}}/acme')
        await page.goto(variable_value_0)
    
    async with testmu.step('Clicking Post idea', instruction_id='3242280e-884c-4d15-8bb4-ec7447658f0e'):
        _loc_1 = page.locator("internal:role=button[name=\"Post idea\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Typing the title “Dark mode for the board”', instruction_id='b870a7cb-9edd-4d4c-a804-6151ef638ce4'):
        element_1 = page.locator("internal:role=textbox[name=\"Title\"i]")
        
        await testmu.fill(element_1, "Dark mode for the board")
    
    async with testmu.step('Checking whether the Similar requests box is present'):
        set_var('similar_requests_box_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {10: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(10).textContent.trim() === 'Similar requests. Vote on one instead?' && !!el(10).offsetParent);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Similar requests. Vote on one"i'], query="whether a 'Similar requests' box is present in the New post form", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="A 'Similar requests' box is shown."))
    
    async with testmu.step('Checking whether Dark mode toggle is listed in Similar requests'):
        set_var('similar_requests_dark_mode_toggle', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {13: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(13).textContent.includes('Dark mode toggle') && !!el(13).offsetParent);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=link[name="Dark mode toggle ▲"i]'], query="whether 'Dark mode toggle' is present in the 'Similar requests' box in the New post form", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The 'Similar requests' box lists 'Dark mode toggle'."))
    
    async with testmu.step('Assertion check', instruction_id='f82064bf-5c12-4ea9-884d-d12c66ece889'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "A 'Similar requests' box is shown.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{similar_requests_box_visible}}', 'store_key': 'similar_requests_box_visible', 'variable_refs': {'{{similar_requests_box_visible}}': 'true'}}, {'description': "The 'Similar requests' box lists 'Dark mode toggle'.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{similar_requests_dark_mode_toggle}}', 'store_key': 'similar_requests_dark_mode_toggle', 'variable_refs': {'{{similar_requests_dark_mode_toggle}}': 'true'}}], 'sub_checks': [{'description': "A 'Similar requests' box is shown.", 'store_key': 'similar_requests_box_visible', 'expected_value': 'true', 'extracted_value': '{{similar_requests_box_visible}}', 'operator': 'equals', 'transforms': []}, {'description': "The 'Similar requests' box lists 'Dark mode toggle'.", 'store_key': 'similar_requests_dark_mode_toggle', 'expected_value': 'true', 'extracted_value': '{{similar_requests_dark_mode_toggle}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "A 'Similar requests' box lists 'Dark mode toggle'."})
    
    async with testmu.step('Waiting for the plan steps to complete', instruction_id='0da44803-680e-4d15-9158-98b5d8ec5559'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "Kane check {{smart.random_string_6}}" into "Title"', instruction_id='97c818eb-acf8-4b72-a6df-7abd808051b1'):
        element_2 = page.locator("internal:role=textbox[name=\"Title\"i]")
        variable_value_3 = var('Kane check {{smart.random_string_6}}')
        
        await testmu.fill(element_2, variable_value_3)
    
    async with testmu.step('Waiting for the queued plan steps to complete', instruction_id='bd6fd1c4-4027-44bb-809e-d24bdf6d108c'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "Created by the Kane suite." into "Details"', instruction_id='3ef2b4f3-8ca3-4708-b104-0ab8475c7574'):
        element_4 = page.locator("internal:role=textbox[name=\"Details\"i]")
        
        await testmu.fill(element_4, "Created by the Kane suite.")
    
    async with testmu.step('Clicking Post to open the new post dialog', instruction_id='27342fc5-96d1-4ece-836b-af1a597f6c78'):
        _loc_2 = page.locator("internal:role=button[name=\"Post\"s]")
        
        await _loc_2.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the post page heading to load', instruction_id='336d8941-4d36-4b65-b551-dc2532afd51f'):
            await page.wait_for_timeout(1000)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Kane check' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Reading the post page title'):
        set_var('post_page_title', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {11: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(11).textContent);\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=heading[name="Kane check"i]'], query='the post title in the level-one heading', expected_value='Kane check', needs_unit_conversion=False, operator='equals', transforms=['strip'], condition="The post page is open with the title 'Kane check {{smart.random_string_6}}'.", reprobe=True))
    
    async with testmu.step('Checking whether the post verification status text is present'):
        set_var('post_page_not_verified_yet', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {21: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(21).textContent.includes('Not verified yet'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Not verified yet. It ships"i'], query="whether the text 'Not verified yet' is present in the Kane CLI verifications paragraph on the post page", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The post page shows the text 'Not verified yet'."))
    
    async with testmu.step('Assertion check', instruction_id='b336198a-378f-415f-ba5c-edba0c03c776'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "The post page is open with the title 'Kane check {{smart.random_string_6}}'.", 'passed': True, 'operator': 'equals', 'transforms': ['strip'], 'json_path': None, 'expected': 'Kane check', 'extracted_value': '{{post_page_title}}', 'store_key': 'post_page_title', 'variable_refs': {'{{post_page_title}}': 'Kane check', '{{smart.random_string_6}}': ''}}, {'description': "The post page shows the text 'Not verified yet'.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{post_page_not_verified_yet}}', 'store_key': 'post_page_not_verified_yet', 'variable_refs': {'{{post_page_not_verified_yet}}': 'true'}}], 'sub_checks': [{'description': "The post page is open with the title 'Kane check {{smart.random_string_6}}'.", 'store_key': 'post_page_title', 'expected_value': 'Kane check', 'extracted_value': '{{post_page_title}}', 'operator': 'equals', 'transforms': ['strip']}, {'description': "The post page shows the text 'Not verified yet'.", 'store_key': 'post_page_not_verified_yet', 'expected_value': 'true', 'extracted_value': '{{post_page_not_verified_yet}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "The post page opens with the title 'Kane check {{smart.random_string_6}}' and the text 'Not verified yet'."})


if __name__ == "__main__":
    testmu.run(test)