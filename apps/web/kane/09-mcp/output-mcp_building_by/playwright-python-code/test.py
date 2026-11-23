import os
import testmu
from testmu import expect, var, set_var
from playwright.async_api import Page

testmu.configure(
    build="c8090b02-a276-481d-985b-6eec7f9e6c3f",
    name="Verify Dark Mode Toggle Request Status",
    tc_id="TC-57",
    network=os.getenv("NETWORK", "false").lower() == "true",
    variables={"request_status_display": "true"},
    global_variables=[{"id": 623263, "name": "e2e_email", "value": "e2e@hearloop.test", "session_value": "e2e@hearloop.test", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 623294, "name": "base_url", "value": "http://localhost:3000", "session_value": "http://localhost:3000", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 640391, "name": "mcp_authorize_url", "value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=grusIkoOXLBrjqAMVwgPxpGFikBoDARa&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "session_value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=grusIkoOXLBrjqAMVwgPxpGFikBoDARa&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}, {"id": 640392, "name": "mcp_deny_url", "value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=hrowywDKEDWjuTmjMlEgTmmHCVIHhSIb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "session_value": "http://localhost:3000/api/auth/oauth2/authorize?response_type=code&client_id=hrowywDKEDWjuTmjMlEgTmmHCVIHhSIb&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid+profile+offline_access&code_challenge=BrMY0phiUmLzPtJUjuiJcVLNIo_W151yw33ZhU1nvb8&code_challenge_method=S256&state=kane&resource=http%3A%2F%2Flocalhost%3A3000%2Fmcp", "is_persist": False, "environment_id": 0, "environment_name": "No Env"}],
    auto_heal_version="AH2",
    default_action_timeout_ms=60000,
    default_navigation_timeout_ms=60000,
    kane_run_v4=True,
)

@testmu.test
async def test(page: Page):
    async with testmu.step('Navigate to {{global.base_url}}/acme', instruction_id='7ccc4452-4ad8-422d-b76a-afc23515215c'):
        variable_value_0 = var('{{global.base_url}}/acme')
        await page.goto(variable_value_0)
    
    async with testmu.step('Clicking Dark mode toggle in the Requests list', instruction_id='0196bf78-7d61-4119-a88f-91cdd5b624a5'):
        _loc_1 = page.locator("internal:role=link[name=\"Dark mode toggle\"i]")
        
        await _loc_1.click()
    _condition_met = False
    _until_retries = 0
    while _until_retries < 10:
        print(f"[until-loop] iteration {_until_retries + 1}/10")
        async with testmu.step('Waiting for the Dark mode toggle request page to load', instruction_id='73568873-9209-436e-9580-7dc6b8e145de'):
            await page.wait_for_timeout(500)
        await page.wait_for_timeout(500)
        if await testmu.check_until_condition(page, "the heading 'Dark mode toggle' is visible"):
            _condition_met = True
            break
        _until_retries += 1
    set_var("__result__", {"condition_met": _condition_met, "retries": _until_retries + 1})
    
    async with testmu.step('Checking whether the request status display is present'):
        set_var('request_status_display', await testmu.textual_analyzer(page, wrapped_js="(els) => {\n  const __m = {26: 0};\n  const el = (i) => els[__m[i]];\n  const __v = (/In progress\\s*by\\s*E2E Tester · Kane Test Client/.test(el(26).innerText));\n  return (typeof __v === 'boolean' ? String(__v) : __v);\n}", locators=['internal:text="In progressby E2E Tester ·"i'], query='whether the request status display in the request details shows In progress followed by by E2E Tester · Kane Test Client', expected_value='true', needs_unit_conversion=False, operator='equals', transforms=[], condition="The request status shows 'In progress' followed by 'by E2E Tester · Kane Test Client'."))
    
    async with testmu.step('Assertion check', instruction_id='56872a7f-a50b-4f1b-8034-c09894294f38'):
        await testmu.verify_assertion(page, 'Assertion check', {'operator': ['equals'], 'assertion_operands': [], 'left_operand': None, 'right_operand': None, 'operands': [], 'sub_results': [{'description': "The request status shows 'In progress' followed by 'by E2E Tester · Kane Test Client'.", 'passed': True, 'operator': 'equals', 'transforms': [], 'json_path': None, 'expected': 'true', 'extracted_value': '{{request_status_display}}', 'store_key': 'request_status_display', 'variable_refs': {'{{request_status_display}}': 'true'}}], 'sub_checks': [{'description': "The request status shows 'In progress' followed by 'by E2E Tester · Kane Test Client'.", 'store_key': 'request_status_display', 'expected_value': 'true', 'extracted_value': '{{request_status_display}}', 'operator': 'equals', 'transforms': []}], 'composite_operator': 'and', 'claim': "Its status shows 'In progress' followed by 'by E2E Tester · Kane Test Client'."})


if __name__ == "__main__":
    testmu.run(test)