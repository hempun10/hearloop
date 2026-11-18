import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="3e6ba111-7528-4636-b028-82d84f424fcc",
    name="Manage Roadmap Card Status",
    tc_id="TC-25",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"roadmap_open_column_visible": "true", "roadmap_planned_column_visible": "true", "roadmap_in_progress_column_visible": "true", "roadmap_shipped_column_visible": "true", "export_posts_to_csv_in_progress_column": "true", "export_posts_to_csv_open_column": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/login?next=/acme/dashboard/roadmap', instruction_id='4de46373-4c76-485d-9335-bd59a734a917'):
        variable_value_0 = var('{{global.base_url}}/login?next=/acme/dashboard/roadmap')
        await page.goto(variable_value_0)
    
    async with testmu.step('Waiting for Email, Password, and Sign in steps to complete', instruction_id='1d775bc9-089a-4157-ae03-adb85290b8c8'):
        await page.wait_for_timeout(1000)
    
    async with testmu.step('Type "{{global.e2e_email}}" into "Email"', instruction_id='6ef010be-f9ba-46f3-b86e-5e1b5a60faad'):
        element_1 = page.locator("internal:role=textbox[name=\"Email\"i]")
        variable_value_2 = var('{{global.e2e_email}}')
        
        await testmu.fill(element_1, variable_value_2)
    
    async with testmu.step('Type "[REDACTED]" into "Password"', instruction_id='736316f6-12b9-4e68-ad74-d283a47479cf'):
        element_3 = page.locator("internal:role=textbox[name=\"Password\"i]")
        variable_value_4 = var('{{secrets.user.e2e_password}}')
        
        await testmu.fill(element_3, variable_value_4)
    
    async with testmu.step('Clicking Sign in button in the email sign-in form', instruction_id='b7ee58af-544c-497e-8d1a-2e9a2e77892f'):
        _loc_1 = page.locator("internal:role=button[name=\"Sign in\"i]")
        
        await _loc_1.click()
    
    async with testmu.step('Checking whether the Roadmap Open column is present'):
        set_var('roadmap_open_column_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {13: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(13).getAttribute('aria-label') === 'Open' && !!el(13).querySelector('h2'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=region[name="Open"i]'], query='whether the Open column is present in the Roadmap board', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the Roadmap shows the Open column.'))
    
    async with testmu.step('Checking whether the Roadmap Planned column is present'):
        set_var('roadmap_planned_column_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {33: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(33).getAttribute('aria-label') === 'Planned' && !!el(33).querySelector('h2'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=region[name="Planned"i]'], query='whether the Planned column is present in the Roadmap board', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the Roadmap shows the Planned column.'))
    
    async with testmu.step('Checking whether the Roadmap In progress column is present'):
        set_var('roadmap_in_progress_column_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {45: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(45).getAttribute('aria-label') === 'In progress' && !!el(45).querySelector('h2'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=region[name="In progress"i]'], query='whether the In progress column is present in the Roadmap board', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the Roadmap shows the In progress column.'))
    
    async with testmu.step('Checking whether the Roadmap Shipped column is present'):
        set_var('roadmap_shipped_column_visible', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {57: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(57).getAttribute('aria-label') === 'Shipped' && !!el(57).querySelector('h2'));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:role=region[name="Shipped"i]'], query='whether the Shipped column is present in the Roadmap board', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition='the Roadmap shows the Shipped column.'))
    
    async with testmu.step('Assertion check', instruction_id='895c1a96-816c-4890-af63-ffc4f07b3bab'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': 'the Roadmap shows the Open column.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{roadmap_open_column_visible}}', 'store_key': 'roadmap_open_column_visible', 'variable_refs': {'{{roadmap_open_column_visible}}': 'true'}}, {'description': 'the Roadmap shows the Planned column.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{roadmap_planned_column_visible}}', 'store_key': 'roadmap_planned_column_visible', 'variable_refs': {'{{roadmap_planned_column_visible}}': 'true'}}, {'description': 'the Roadmap shows the In progress column.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{roadmap_in_progress_column_visible}}', 'store_key': 'roadmap_in_progress_column_visible', 'variable_refs': {'{{roadmap_in_progress_column_visible}}': 'true'}}, {'description': 'the Roadmap shows the Shipped column.', 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{roadmap_shipped_column_visible}}', 'store_key': 'roadmap_shipped_column_visible', 'variable_refs': {'{{roadmap_shipped_column_visible}}': 'true'}}], 'sub_checks': [{'description': 'the Roadmap shows the Open column.', 'store_key': 'roadmap_open_column_visible', 'expected_value': 'true', 'extracted_value': '{{roadmap_open_column_visible}}', 'operator': 'equals', 'transforms': []}, {'description': 'the Roadmap shows the Planned column.', 'store_key': 'roadmap_planned_column_visible', 'expected_value': 'true', 'extracted_value': '{{roadmap_planned_column_visible}}', 'operator': 'equals', 'transforms': []}, {'description': 'the Roadmap shows the In progress column.', 'store_key': 'roadmap_in_progress_column_visible', 'expected_value': 'true', 'extracted_value': '{{roadmap_in_progress_column_visible}}', 'operator': 'equals', 'transforms': []}, {'description': 'the Roadmap shows the Shipped column.', 'store_key': 'roadmap_shipped_column_visible', 'expected_value': 'true', 'extracted_value': '{{roadmap_shipped_column_visible}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': 'the Roadmap shows columns Open, Planned, In progress and Shipped.'})
    
    async with testmu.step('Selecting In progress in Export posts to CSV dropdown', instruction_id='603aabdd-9582-4ead-a600-1c773694914a'):
        element_5 = page.locator("internal:label=\"Move Export posts to CSV\"i")
        
        await element_5.select_option()
    
    async with testmu.step('Checking whether the Export posts to CSV card is present in the In progress column'):
        set_var('export_posts_to_csv_in_progress_column', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {41: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (el(41).querySelector('p')?.textContent.trim() === 'Export posts to CSV' && el(41).querySelector('select option:checked')?.textContent.trim() === 'In progress');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Export posts to CSV▲"i'], query="whether the 'Export posts to CSV' card in the In progress column is present", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the 'Export posts to CSV' card is in the In progress column."))
    
    async with testmu.step('Assertion check', instruction_id='650941f5-d04b-4511-a87e-c311e6188a97'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the 'Export posts to CSV' card is in the In progress column.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{export_posts_to_csv_in_progress_column}}', 'store_key': 'export_posts_to_csv_in_progress_column', 'variable_refs': {'{{export_posts_to_csv_in_progress_column}}': 'true'}}], 'sub_checks': [{'description': "the 'Export posts to CSV' card is in the In progress column.", 'store_key': 'export_posts_to_csv_in_progress_column', 'expected_value': 'true', 'extracted_value': '{{export_posts_to_csv_in_progress_column}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the 'Export posts to CSV' card is now in the In progress column."})
    
    async with testmu.step('Selecting Move Export posts to CSV card status to Open', instruction_id='6b761416-f3dc-472a-8e4f-61907a81029d'):
        element_6 = page.locator("internal:label=\"Move Export posts to CSV\"i")
        
        await element_6.select_option()
    
    async with testmu.step('Checking whether the Export posts to CSV card is present in the Open column'):
        set_var('export_posts_to_csv_open_column', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {18: 0, 19: 1};\n  const el = (i) => els[__m[i]];\n  const __v = (el(18).textContent.trim() === 'Export posts to CSV' && el(19).value === 'open');\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="Export posts to CSV"i', 'internal:label="Move Export posts to CSV"i'], query="whether the 'Export posts to CSV' card in the Open column is present", expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="the 'Export posts to CSV' card is in the Open column."))
    
    async with testmu.step('Assertion check', instruction_id='16e1564c-cb52-4070-b679-275c0bba333a'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "the 'Export posts to CSV' card is in the Open column.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{export_posts_to_csv_open_column}}', 'store_key': 'export_posts_to_csv_open_column', 'variable_refs': {'{{export_posts_to_csv_open_column}}': 'true'}}], 'sub_checks': [{'description': "the 'Export posts to CSV' card is in the Open column.", 'store_key': 'export_posts_to_csv_open_column', 'expected_value': 'true', 'extracted_value': '{{export_posts_to_csv_open_column}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "the 'Export posts to CSV' card is in the Open column."})


if __name__ == "__main__":
    testmu.run(test)